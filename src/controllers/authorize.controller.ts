import { Service } from '../services/services';
import { LoginModel } from '../models/login.model';
import { UsersEntity } from '../databases/database.entity';
import { Response } from '../servers/Response';
import { EMsg, EStatus } from '../services/message';
export class AuthorizeController {
    public static login(data: LoginModel): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            UsersEntity.findOne({ where: { username: data.username } }).then(result => {
                if (result) {
                    if (result.validPassword(data.password)) {
                        const users = Service.clone(result);
                        delete users.password;
                        const token = Service.jwtEncode(users);
                        const data = {
                            user: users,
                            token: token
                        }
                        resolve(Service.getRes(data, EMsg.loginSuccess, EStatus.success))
                    } else {
                        resolve(Service.getRes([], EMsg.wrongAccount, EStatus.fail));
                    }
                } else {
                    resolve(Service.getRes([], EMsg.wrongAccount, EStatus.fail));
                }
            })
        })

    }
}
