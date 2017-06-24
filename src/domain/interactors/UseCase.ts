import { Subscription, Subscriber, Observable } from '@reactivex/rxjs';

export abstract class UseCase {
    subscription: Subscription;
    constructor() {
        this.subscription = Subscription.EMPTY;
    }

    protected abstract buildUseCaseObservable(): Observable<any>;

    public execute(useCaseSubscriber: Subscriber<any>) {
        this.subscription = this.buildUseCaseObservable()
            .subscribe(useCaseSubscriber);
    }

    public unsubscribe() {
        if (!this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }
}
