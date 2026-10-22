type Paddle = { x: number; y: number; w: number; h: number; error: number };

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const INK = "24, 24, 27"; // dark gray, readable on the light background
const MISSINESS = 1.4; // higher = AI misses more often
const WIN_SCORE = 9;

export class PongEngine {
  private w = 0;
  private h = 0;
  private ball = { x: 0, y: 0, vx: 0, vy: 0, r: 7 };
  private left: Paddle = { x: 0, y: 0, w: 12, h: 100, error: 0 };
  private right: Paddle = { x: 0, y: 0, w: 12, h: 100, error: 0 };
  private score = [0, 0];
  private speed = 0;
  private baseSpeed = 400;
  private maxSpeed = 700;
  private serveTimer = 0;

  constructor(w: number, h: number) {
    this.resize(w, h);
    this.serve(Math.random() < 0.5 ? 1 : -1);
  }

  resize(w: number, h: number) {
    this.w = w;
    this.h = h;

    const ph = clamp(h * 0.16, 70, 150);
    const margin = clamp(w * 0.03, 20, 48);
    for (const p of [this.left, this.right]) {
      p.h = ph;
      p.y = clamp(p.y || h / 2 - ph / 2, 0, h - ph);
    }
    this.left.x = margin;
    this.right.x = w - margin - this.right.w;

    this.baseSpeed = clamp(w * 0.4, 320, 620);
    this.maxSpeed = this.baseSpeed * 1.8;
    this.speed = clamp(this.speed || this.baseSpeed, this.baseSpeed, this.maxSpeed);

    this.ball.x = clamp(this.ball.x || w / 2, 0, w);
    this.ball.y = clamp(this.ball.y || h / 2, 0, h);
  }

  private rerollErrors() {
    this.left.error = (Math.random() - 0.5) * this.left.h * MISSINESS;
    this.right.error = (Math.random() - 0.5) * this.right.h * MISSINESS;
  }

  private serve(dir: 1 | -1) {
    const b = this.ball;
    b.x = this.w / 2;
    b.y = this.h / 2;
    this.speed = this.baseSpeed;
    const angle = (Math.random() - 0.5) * 0.8;
    b.vx = dir * Math.cos(angle) * this.speed;
    b.vy = Math.sin(angle) * this.speed;
    this.serveTimer = 0.8;
    this.rerollErrors();
  }

  /** Where the ball will cross a paddle's x position, folded for wall bounces. */
  private predictY(p: Paddle) {
    const b = this.ball;
    const targetX = p === this.right ? p.x - b.r : p.x + p.w + b.r;
    const t = (targetX - b.x) / b.vx;
    const y = b.y + b.vy * t;

    const min = b.r;
    const span = this.h - b.r * 2;
    let rel = (y - min) % (span * 2);
    if (rel < 0) rel += span * 2;
    if (rel > span) rel = span * 2 - rel;
    return min + rel;
  }

  private moveAI(p: Paddle, dt: number) {
    const b = this.ball;
    const incoming = p === this.right ? b.vx > 0 : b.vx < 0;
    const target = incoming ? this.predictY(p) + p.error : this.h / 2;
    const maxStep = this.baseSpeed * (incoming ? 0.9 : 0.35) * dt;
    const diff = target - (p.y + p.h / 2);
    p.y = clamp(p.y + clamp(diff, -maxStep, maxStep), 0, this.h - p.h);
  }

  private bounce(p: Paddle, dir: 1 | -1) {
    const b = this.ball;
    const rel = clamp((b.y - (p.y + p.h / 2)) / (p.h / 2), -1, 1);
    const angle = rel * 0.9;
    this.speed = Math.min(this.speed * 1.06, this.maxSpeed);
    b.vx = dir * Math.cos(angle) * this.speed;
    b.vy = Math.sin(angle) * this.speed;
    b.x = dir === 1 ? p.x + p.w + b.r : p.x - b.r;
    this.rerollErrors();
  }

  private step(dt: number) {
    const b = this.ball;
    this.moveAI(this.left, dt);
    this.moveAI(this.right, dt);

    if (this.serveTimer > 0) {
      this.serveTimer -= dt;
      return;
    }

    b.x += b.vx * dt;
    b.y += b.vy * dt;

    if (b.y - b.r < 0) {
      b.y = b.r;
      b.vy = Math.abs(b.vy);
    } else if (b.y + b.r > this.h) {
      b.y = this.h - b.r;
      b.vy = -Math.abs(b.vy);
    }

    const L = this.left;
    const R = this.right;
    const overlapsY = (p: Paddle) =>
      b.y + b.r >= p.y && b.y - b.r <= p.y + p.h;

    if (b.vx < 0 && b.x - b.r <= L.x + L.w && b.x + b.r >= L.x && overlapsY(L)) {
      this.bounce(L, 1);
    } else if (b.vx > 0 && b.x + b.r >= R.x && b.x - b.r <= R.x + R.w && overlapsY(R)) {
      this.bounce(R, -1);
    }

    if (b.x + b.r < 0) this.point(1);
    else if (b.x - b.r > this.w) this.point(0);
  }

  private point(winner: 0 | 1) {
    this.score[winner]++;
    if (this.score[winner] >= WIN_SCORE) this.score = [0, 0];
    this.serve(winner === 0 ? 1 : -1);
  }

  update(dt: number) {
    // small sub-steps so the fast ball can never tunnel through a paddle
    const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
    for (let i = 0; i < steps; i++) this.step(dt / steps);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const { w, h, ball, left, right } = this;
    ctx.clearRect(0, 0, w, h);

    // center line
    ctx.fillStyle = `rgba(${INK}, 0.08)`;
    for (let y = 8; y < h; y += 28) ctx.fillRect(w / 2 - 2, y, 4, 14);

    // scores
    ctx.font = `700 ${clamp(h * 0.18, 80, 180)}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = `rgba(${INK}, 0.06)`;
    ctx.fillText(String(this.score[0]), w * 0.25, h * 0.08);
    ctx.fillText(String(this.score[1]), w * 0.75, h * 0.08);

    // paddles
    ctx.fillStyle = `rgba(${INK}, 0.22)`;
    ctx.fillRect(left.x, left.y, left.w, left.h);
    ctx.fillRect(right.x, right.y, right.w, right.h);

    // square ball, pixel-style to match the dog
    ctx.fillStyle = `rgba(${INK}, 0.4)`;
    ctx.fillRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);
  }
}