type Callback = () => void;
type Condition = () => boolean;

export class FrameInterval {
    private id: number | null = null;
    private callback: Callback;
    private thenfn: Callback = () => undefined;
    private stopCondition: Condition;

    constructor(callback?: Callback) {
        this.callback = callback ?? (() => undefined);
        this.stopCondition = () => false;

        this.id = requestAnimationFrame(this.tick.bind(this));
    }

    private tick(): void {
        if (this.stopCondition()) {
            this.cancel();
            return;
        }

        this.callback();
        this.id = requestAnimationFrame(this.tick.bind(this));
    }

    public cancel(): void {
        if (this.id !== null) {
            cancelAnimationFrame(this.id);
            this.id = null;
        }
        this.thenfn();
    }

    public until(stopCondition: Condition) {
        this.stopCondition = stopCondition;
        return this;
    }

    public then(thenfn: Callback) {
        this.thenfn = thenfn;
    }
}  
