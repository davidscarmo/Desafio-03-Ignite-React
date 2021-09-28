import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { useState } from 'react';

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
  const [postsData, setPostsData] = useState(postsPagination.results);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);

  const handleNextPost = async () => {
    console.log(nextPage);
    let nextPost: Post[];
    fetch(nextPage)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setNextPage(json.next_page);
        nextPost = json.results.map(post => ({
          uid: post.uid,
          first_publication_date: format(
            new Date(post.first_publication_date),
            'dd MMM yyyy',
            {
              locale: ptBR,
            }
          ),
          data: post.data,
        }));

        setPostsData([...postsData, nextPost[0]]);
      });
  };
  return (
    <main className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <div className={styles.postContainer}>
          {postsData.map(post => {
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

        {nextPage && (
          <button onClick={handleNextPost} className={styles.loadMorePosts}>
            {' '}
            Carregar mais posts
          </button>
        )}
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
