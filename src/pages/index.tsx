import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

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

export default function Home({ postsPagination }: HomeProps) {
  console.log(postsPagination);
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          {postsPagination.results.map(post => {
            return (
              <Link href={`/post/${post.uid}`}>
                <div className={styles.postItem}>
                  <h2> {post.data.title}</h2>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.dateAndAuthorArea}>
                    <time className={styles.time}>
                      <img
                        src="images/calendarIcon.svg"
                        alt="Ícone de um calendário"
                      />
                      <p> {post.first_publication_date}</p>
                    </time>
                    <div className={styles.author}>
                      <img
                        src="images/userIcon.svg"
                        alt="Ícone de um usuário"
                      />
                      <p>{post.data.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    {
      fetch: [
        'posts.uid',
        'posts.first_publication_date',
        'posts.title',
        'posts.subtitle',
        'posts.author',
      ],
      pageSize: 1,
    }
  );
  const posts = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });
  const nextPage = postsResponse.next_page;
  return {
    props: { postsPagination: { results: posts, next_page: nextPage } },
  };
};
