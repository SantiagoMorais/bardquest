import styles from "./index.module.scss";

interface ITagListProps {
  title: string;
  items: string[];
}

export const TagList = ({ title, items }: ITagListProps) => {
  return (
    <div className={styles.tagBlock}>
      <h5 className={styles.tagTitle}>{title}</h5>
      <ul className={styles.tagList}>
        {items.map((item) => (
          <li key={item} className={styles.tag}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
