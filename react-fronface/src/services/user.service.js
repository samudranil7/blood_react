import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
  getDonor() {
    return axios.get(API_URL + 'donor_details', { headers: authHeader() });
  }
  getBloodBank() {
    return axios.get(API_URL + 'blood_bank_details', { headers: authHeader() });
  }
  deleteAdminBank(id)
  {
      return axios.get(API_URL + 'delete_bank/'+id, { headers: authHeader() });
  }
  deleteAdminDonor(id)
  {
      return axios.get(API_URL + 'delete_donor/'+id, { headers: authHeader() });
  }
  addDonorDetails(donor)
  {
    return axios.post(API_URL + 'add_donor_details',donor,{ headers: authHeader() });
  }
  addBankDetails(bank)
  {
    return axios.post(API_URL + 'add_bank_details',bank,{ headers: authHeader() });
  }
}

export default new UserService();
