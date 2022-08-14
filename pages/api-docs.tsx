/* eslint-disable */
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic, { DynamicOptions } from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

type DynamicType = {
  spec: Record<string, any>;
};

const SwaggerUI = dynamic<DynamicType>(
  import('swagger-ui-react') as unknown as DynamicOptions<DynamicType>,
  { ssr: false }
);

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'pages/api',
    schemaFolders: ['models'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
