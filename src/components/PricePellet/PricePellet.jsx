import "./PricePellet.scss";

export default function PricePellet({ text, isSelected, onClickAction }) {
  return (
    <button
      className={isSelected ? "price-pellet active" : "price-pellet"}
      type="button"
      onClick={() => onClickAction()}
    >
      <p>{text}</p>
    </button>
  );
}
