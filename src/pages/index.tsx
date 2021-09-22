import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          <div className={styles.postItem}>
            <h2> Com utilizar hooks</h2>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.dateAndAuthorArea}>
              <time className={styles.time}>
                <img
                  src="images/calendarIcon.svg"
                  alt="Ícone de um calendário"
                />
                <p> 19 abr 2021</p>
              </time>
              <div className={styles.author}>
                <img src="images/userIcon.svg" alt="Ícone de um usuário" />
                <p>David Carmo</p>
              </div>
            </div>
          </div>
          <div className={styles.postItem}>
            <h2> Com utilizar hooks</h2>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.dateAndAuthorArea}>
              <time className={styles.time}>
                <img
                  src="images/calendarIcon.svg"
                  alt="Ícone de um calendário"
                />
                <p> 19 abr 2021</p>
              </time>
              <div className={styles.author}>
                <img src="images/userIcon.svg" alt="Ícone de um usuário" />
                <p>David Carmo</p>
              </div>
            </div>
          </div>
          <div className={styles.postItem}>
            <h2> Com utilizar hooks</h2>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.dateAndAuthorArea}>
              <time className={styles.time}>
                <img
                  src="images/calendarIcon.svg"
                  alt="Ícone de um calendário"
                />
                <p> 19 abr 2021</p>
              </time>
              <div className={styles.author}>
                <img src="images/userIcon.svg" alt="Ícone de um usuário" />
                <p>David Carmo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
