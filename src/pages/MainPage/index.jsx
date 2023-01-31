import styles from "./MainPage.module.scss";
import pokemonApi from "../../api/pokemonApi";
import { useQuery } from "react-query"; // use-Query套件
import { useState } from "react";
import FadeLoader from "react-spinners/ClipLoader"; // 轉場spinner

function MainPage() {
  const [pokeNumber, setPokeNumber] = useState(1);
  const { data, isSuccess, isError, isLoading, dataUpdatedAt } = useQuery(
    ["PokemonAPI", pokeNumber],
    pokemonApi,
    {
      refetchOnWindowFocus: false,
    }
  );
  function timeToDate(time) {
    let newTime = new Date(time);
    return newTime.toLocaleString();
  }

  // 如果fetch api 錯誤
  if (isError) {
    return <h1>Something Error</h1>;
  }

  return (
    <div className={styles.main}>
      {isLoading && (
        <>
          <FadeLoader color="#36d7b7" />
          <h1>資料讀取中</h1>
        </>
      )}
      {isSuccess && (
        <div className={styles.box}>
          <div className={styles.update}>
            更新於: {timeToDate(dataUpdatedAt)}
          </div>
          <div className={styles.btn_group}>
            <button
              className={styles.btn}
              onClick={() => setPokeNumber((pre) => pre - 1)}
              disabled={pokeNumber === 1 && "disable"}
            >
              Pre
            </button>
            <button
              className={styles.btn}
              onClick={() => setPokeNumber((pre) => pre + 1)}
            >
              Next
            </button>
          </div>
          <div className={styles.card}>
            <div className={styles.series}>
              <p className={styles.order}>NO. {data.order}</p>
              <p className={styles.name}>{data.name}</p>
            </div>
            <div className={styles.image_wrap}>
              <img
                src={data?.sprites?.front_default}
                className={styles.image}
                alt={data.name}
              />
            </div>
            <div className={styles.type}>
              {data.types.map((type) => (
                <p className={`${styles[type.type.name]}`} key={type.slot}>
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MainPage;
