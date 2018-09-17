import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS
};
export const Reducer = (state = initialState, action) => {
  {/*state is undefined then state is initialState*/}
  {/*immutable change and return updated version of state*/}
  return state;

};
