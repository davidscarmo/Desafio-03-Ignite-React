import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Prismic from '@prismicio/client';
import router, { useRouter } from 'next/router';
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

export default function Post({ post }: PostProps) {
  const route = useRouter();
  if (route.isFallback) {
    return <p>Carregando...</p>;
  }

  let headingWords = 0;
  let bodyWords = 0;
  post.data.content.forEach(item => {
    headingWords += item.heading.split(' ').length;
    item.body.forEach(item => {
      bodyWords += item.text.split(' ').length;
    });
  });
  let timeToRead =
    Math.ceil((headingWords + bodyWords) / 200).toString() + ` min`;
  return (
    <>
      <div className={styles.banner}>
        <img src={post.data.banner.url} alt="Banner" />
      </div>

      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h1>{post.data.title}</h1>
          <div className={styles.infoArea}>
            <time className={styles.date}>
              <img
                src="/images/calendarIcon.svg"
                alt="Ícone de um calendário."
              />
              <p>
                {' '}
                {format(new Date(post.first_publication_date), 'dd MMM yyyy', {
                  locale: ptBR,
                })}
              </p>
            </time>
            <div className={styles.author}>
              <img src="/images/userIcon.svg" alt="Ícone de um usuário" />
              <p> {post.data.author}</p>
            </div>
            <div className={styles.timeToRead}>
              <img src="/images/clockIcon.svg" alt="Ícone de um relógio" />
              <p>{timeToRead}</p>
            </div>
          </div>
        </header>

        <div className={styles.mainContent}>
          {post.data.content.map((contentItem, index) => {
            return (
              <div
                key={index}
                dangerouslySetInnerHTML={{
                  __html: `<h2>${contentItem.heading}</h2> ${String(
                    RichText.asHtml(contentItem.body)
                  )}`,
                }}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query(
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
  const paths = posts.results.map(path => {
    return {
      params: { slug: path.uid },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(contentItem => ({
        body: contentItem.body,
        heading: contentItem.heading,
      })),
    },
  };
  return {
    props: { post },
  };
};
