import styles from './NotFoundBlock.module.scss';

function NotFoundBlock(props) {
  return (
    <div className={styles.root}>
      <h1>
        <span> 😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.discription}>
        К сожалению данная страница отсутствует в нашем интернет магазине
      </p>
    </div>
  );
}

export default NotFoundBlock;