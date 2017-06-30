import { Observable } from '@reactivex/rxjs';

import { UseCase } from './UseCase';
import { TokenRepository } from '../repository/TokenRepository';
import {TokenDataRepository} from '../../data/repository/TokenDataRepository';

export class DeleteTokenUseCase extends UseCase {

    private tokenRepository: TokenRepository;

    public constructor(
        tokenRepository: TokenRepository = new TokenDataRepository()) {
        super();
        this.tokenRepository = tokenRepository;
    }

    protected buildUseCaseObservable(): Observable<any> {
        return this.tokenRepository.deleteToken();
    }
}
