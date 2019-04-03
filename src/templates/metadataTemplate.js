/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * HCA Data Portal metadata template component.
 */

// Core dependencies
import {graphql} from 'gatsby';
import React from 'react';

// App dependencies
import Layout from '../components/layout';
import Metadata from '../components/metadata/metadata';

// Styles
import compStyles from './metadataTemplate.module.css';
import fontStyles from '../styles/fontsize.module.css';
import globalStyles from '../styles/global.module.css';

let classNames = require('classnames');

// the data prop will be injected by the GraphQL query below.
export default function Template({data}) {

	const markdownRemark = data.markdown; // data.markdownRemark holds our post data
	const {frontmatter, html} = markdownRemark;

	let docPath, title;
	docPath = markdownRemark.fields.path;

	if (frontmatter) {
		title = frontmatter.title;
	}

	const types = data.typeMetadata.edges.map(n => n.node);
	const referenceMetadata = data.referenceMetadata.edges.map(n => n.node);

	return (
		<Layout pageTitle={title} docPath={docPath}>
			<div className={classNames(globalStyles.md, compStyles.meta)} dangerouslySetInnerHTML={{__html: html}}/>
			<p className={fontStyles.xxs}>* Indicates a required field</p>
			{types.length ? types.map((e, i) => <Metadata entity={e} reference={referenceMetadata}
														  key={i}/>) : null}
		</Layout>
	);
}

// modified to find the page by id which is passed in as context
export const pageQuery = graphql`
query ($id: String!, $metadataCoreName: String!) {
  markdown: markdownRemark(id: {eq: $id}) {
    id
    html
    fields {
      path
    }
    frontmatter {
      path
      title
    }
  }
  typeMetadata: allMetadataSchemaEntity(filter: {coreEntity: {eq: $metadataCoreName}, schemaType: {eq: "type"}}) {
    edges {
      node {
        title
        coreEntity
        schemaType
        properties {
          name
          description
          arrayModuleRef
          arrayName
          arrayType
          objectModuleRef
          objectName
          required
          type
          userFriendly
        }
      }
    }
  }
  referenceMetadata: allMetadataSchemaEntity(filter: {schemaType: {in: ["module","core"]}}) {
  edges {
    node {
      title
      coreEntity
      schemaType
      relativeFilePath
      properties {
          name
          description
          arrayName
          arrayType
          objectName
          required
          type
          userFriendly
        }
      }
    }
  }
}
`;
