import TransactionAttributeUsage from './txAttributeUsage'
import { num2hexstring, StringStream, num2VarInt, str2hexstr } from '../utils';
import { Transaction } from '../transaction';
import { userInfo } from 'os';
/**
 *TransactionAttribute
 * @property {number} usage - Identifying byte
 * @property {string} data - Data
 */
export default class TransactionAttribute {
    usage: number
    //data.length is 0x14
    data: string

    constructor(){
        
    }

    serialize() : string {
        let result = ''
        result += num2hexstring(this.usage)
        result += num2VarInt(this.data.length/2)
        result += this.data        
        return result
    }

    deserialize( ss : StringStream) : void {
        //usage
        const usage = parseInt(ss.read(1), 16)
        //get hash with publicKey
        const dataLen = parseInt(ss.read(1), 16)
        const data = ss.read(dataLen)
        this.usage = usage
        this.data = data
    }
}