import * as reactRouter from 'react-router';
import Cellgrocerylist from './Cellgrocerylist';
import Cellmeal from './Cellmeal';
import Celltimer from './Celltimer';
import Wrappedrowlist from './Wrappedrowlist';

export default function Portraitassistant() {
  const history = reactRouter.useHistory();
  const handleMealClick = () => {
    history.push('/assistant/recipe/1');
  };
  return (
    <div>
      <div className="row wrap">
        <Cellmeal strMeal="Recipe 1" handleClick={handleMealClick} />
        <Cellmeal strMeal="Recipe 2" handleClick={handleMealClick} />
        <Cellmeal strMeal="Recipe 3" handleClick={handleMealClick} />
        <Cellmeal strMeal="Recipe 4" handleClick={handleMealClick} />
      </div>
      <Wrappedrowlist list={'0'.repeat(10).split('')} item={Celltimer} basis={40} />
      <Wrappedrowlist list={'0'.repeat(4).split('')} item={Cellgrocerylist} basis={40} />

      <span>asd</span>
    </div>
  );
}
