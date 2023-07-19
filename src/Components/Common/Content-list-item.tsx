import { Description } from "@/Components/Common/Desctiption.tsx";
import { Amount } from "@/Components/Common/Amount.tsx";
import { TiDeleteOutline } from "react-icons/ti";
export const ContentListItem: React.FC<ContentListItemProps> =
  ({ isDiv, state, item, handleChange, handleSubmit, handleDelete }) => {
    return (
      <div className={"content-input-list"}>
        <li
          onClick={(e) => handleChange(item._id, e as any)}
          className={"pretend-list-item"}
          key={item._id}>
          <Description
            isDiv={isDiv[item._id] || false} id={"description"}
            state={state} item={item}
            handleChange={handleChange} handleBlur={handleSubmit} />
          <Amount
            isDiv={isDiv[item._id] || false} id={"amount"}
            state={state} item={item}
            handleChange={handleChange} handleBlur={handleSubmit} />
          <TiDeleteOutline
            className={"delete-button"}
            onClick={() => handleDelete(item._id)} />
        </li>
      </div>
    );
  };