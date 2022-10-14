import styleSlick from "../../components/RSlick/MultipleRowSlick.module.css";
export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]} `}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    ></div>
  );
};
