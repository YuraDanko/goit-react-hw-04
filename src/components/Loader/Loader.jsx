import { TailSpin } from "react-loader-spinner";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loader}>
      <TailSpin color="#3f51b5" height={50} width={50} />
    </div>
  );
};

export default Loader;
