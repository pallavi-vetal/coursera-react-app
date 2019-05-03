import {createStore, combineReducers, applyMiddleware } from 'redux';
import {Comments} from './CommentsReducer'
import {Dishes} from './DishesReducer'
import {Leaders} from './LeadersReducer'
import {Promotions} from './PromotionsReducer'
import thunk from 'redux-thunk';

import { createForms } from 'react-redux-form';
import { InitialFeedback } from './Forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            comments: Comments,
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        
        applyMiddleware(thunk)
        
    );

    return store;
}