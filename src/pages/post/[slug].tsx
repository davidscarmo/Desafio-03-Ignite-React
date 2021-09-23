import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <div className={styles.banner}>
        <img src="/images/banner_test.png" alt="Banner" />
      </div>

      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h1>Criando um app CRA do zero</h1>
          <div className={styles.infoArea}>
            <time className={styles.date}>
              <img
                src="/images/calendarIcon.svg"
                alt="Ícone de um calendário."
              />
              <p> 15 Mar 2021</p>
            </time>
            <div className={styles.author}>
              <img src="/images/userIcon.svg" alt="Ícone de um usuário" />
              <p> David Carmo</p>
            </div>
            <div className={styles.timeToRead}>
              <img src="/images/clockIcon.svg" alt="Ícone de um relógio" />
              <p> 4 min</p>
            </div>
          </div>
        </header>

        <div className={styles.mainContent}>
          <h2>Alabimba</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dolor sapien, vulputate eu diam at, condimentum hendrerit tellus.
            Nam facilisis sodales felis, pharetra pharetra lectus auctor sed. Ut
            venenatis mauris vel libero pretium, et pretium ligula faucibus.
            Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam
            venenatis.
          </p>
        </div>
      </main>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
