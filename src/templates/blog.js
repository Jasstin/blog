import * as React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location,pageContext}) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allMarkdownRemark.nodes
    const {currentPage,totalPage}=pageContext
    if (posts.length === 0) {
        return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />
                <p>
                    No blog posts found. Add markdown posts to "content/blog" (or the
                    directory you specified for the "gatsby-source-filesystem" plugin in
                    gatsby-config.js).
                </p>
            </Layout>
        )
    }
    return (
            <Layout location={location} title={siteTitle}>
                <Seo title="All posts" />
                <ol className="article-list">
                    {posts.map(post => {
                        const title = post.frontmatter.title || post.fields.slug

                        return (
                            <li key={post.fields.slug} className="article-list-item">
                                <article
                                    className="post-list-item"
                                    itemScope
                                    itemType="http://schema.org/Article"
                                >
                                    <header>
                                        <h2 className="title">
                                            <Link to={post.fields.slug} itemProp="url">
                                                <span itemProp="headline">{title}</span>
                                            </Link>
                                        </h2>
                                        <small className="date">{post.frontmatter.date}</small>
                                    </header>
                                    <section className="description" dangerouslySetInnerHTML={{
                                        __html: post.frontmatter.description || post.excerpt,
                                    }}
                                             itemProp="description">
                                    </section>
                                    <footer>
                                        {post.frontmatter.tags?.map(item=><small className="tag">{item}</small>)}
                                    </footer>
                                </article>
                            </li>
                        )
                    })}
                </ol>
                <footer className="page-control-group">
                    <div>
                        {currentPage - 1 > 0 && (
                            <Link
                                to={'/blog/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
                                rel="prev"
                            >
                                ← 上一页
                            </Link>
                        )}
                    </div>
                    <div>
                        {currentPage + 1 <= totalPage && (
                            <Link to={'/blog/' + (currentPage + 1)} rel="next">
                                下一页 →
                            </Link>
                        )}
                    </div>
                </footer>
            </Layout>
    )
}
export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!,$tag: String){
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip:$skip
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
  }
`
