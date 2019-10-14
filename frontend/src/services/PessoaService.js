import axios from 'axios';
import config from '../config/config';

class PessoaService {
    
    insertOrUpdade(pessoa) {
        if (pessoa.id) {
            return this.update(pessoa);
        } else {
            return this.insert(pessoa);
        }

    }

    insert(pessoa) {
        return axios.post(`${config.baseUrl}/pessoa`, pessoa).then((response)=>{
            return response;
        }).catch((err)=>{
            console.log("Error in response");
            console.log(err);
        })
    }

    update(pessoa) {
        let id = pessoa.id;
        return axios.put(`${config.baseUrl}/pessoa/${id}`, pessoa).then((response)=>{
            return response;
        }).catch((err)=>{
            console.log("Error in response");
            console.log(err);
        })
    }

    remove(pessoa) {
        let id = pessoa.id;
        return axios.delete(`${config.baseUrl}/pessoa/${id}`).then((response)=>{
            return response;
        }).catch((err)=>{
            console.log("Error in response");
            console.log(err);
        })
    }

    getPessoa(id) {
        return axios.get(`${config.baseUrl}/pessoa/${id}`).then((response)=>{
            return response;
        }).catch((err)=>{
            console.log("Error in response");
            console.log(err);
        })
    }

    listAll() {
        return axios.get(`${config.baseUrl}/pessoas`).then((response)=>{
            return response;
        }).catch((err)=>{
            console.log("Error in response");
            console.log(err);
        })
    }
    
}

export default new PessoaService();