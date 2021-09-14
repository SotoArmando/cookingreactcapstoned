import Cellprofilepicture from './Cellprofilepicture';

export default function Portraitassistantrecipe() {
  return (
    <div className="row ">
      <div className="col halfbodywidth">
        <span>Lorem ipsum</span>
        <span>Lorem ipsum</span>
        <span>Lorem ipsum</span>
        <span>Lorem ipsum</span>
      </div>
      <div className="col">
        <Cellprofilepicture size={44} />
        <span>
          Macaroni or shor-cut pasta
          Milk
          Butter
          Flour
          Cheese
          Dijon
          Salt Pepper and Mustard
          Almonds
        </span>
        <span className="tcenter">First lets check if you have these </span>
      </div>
    </div>
  );
}
