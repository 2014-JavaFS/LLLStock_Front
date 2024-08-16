import Selection_Card from "../custom-components/selection_card";
const Livestock_Select_Page = () => {
     return (
          //When an owner is selected, this page appears
          //Dynamically render all cattle based on animal_id as clickable cards
          <div>
               <Selection_Card/>
          </div>
     );
}

export default Livestock_Select_Page;