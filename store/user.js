import { auth } from '~/plugins/firebase';
import axios from 'axios';

export const state = () => ({
  id: null,
  drinklogs: [],
  logsRetrieved: false,
  retrieveLogsErrorMessage: '',
})

export const getters = {
  totalToday: state => {
    return state.drinklogs.reduce((total, drinklog) => {
      return total + drinklog.amount;
    }, 0);
  }
}

export const mutations = {
  SET_ID (state, id) {
    state.id = id;
  },
  CLEAR (state) {
    state.id = null;
    state.drinklogs = [];
    state.logsRetrieved = false;
    state.retrieveLogsErrorMessage = '';
  },
  SET_DRINKLOGS (state, drinklogs) {
    state.drinklogs = [];
    state.drinklogs.push(...drinklogs);
    state.logsRetrieved = true;
  },
  SET_RETRIEVELOGS_ERROR (state, errorMessage) {
    state.retrieveLogsErrorMessage = errorMessage;
  }
}

export const actions = {
  GET_DRINKLOGS (state) {
    state.commit('SET_RETRIEVELOGS_ERROR', '');

    auth.currentUser.getIdToken().then(token => {
      // TODO: get this from configuration
      axios.get('http://localhost:33255/drinklogs', {
        headers: {
          'Authorization': token
        }
      })
      .then(result => {
        state.commit('SET_DRINKLOGS', result.data)
      })
      .catch(e => {
        state.commit('SET_RETRIEVELOGS_ERROR', 'Unable to connect to service')
      });
    });
  },
  SUBMIT_DRINKLOG (state, amount) {
    auth.currentUser.getIdToken().then(token => {
      let formData = "amt=" + amount;

      // TODO: get this from configuration
      axios.post('http://localhost:33255/drinklogs', formData, {
        headers: {
          'Authorization': token
        },
      })
      .then(() => {
        state.dispatch('GET_DRINKLOGS');
      });
      // TODO: handle connectivity errors
    });
  }
}