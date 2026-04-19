// src/pages/PostPage.js
// Displays one full post and its comments.
// Logged-in members/admins can add + delete comments.
// Post owner or admin can edit or delete the post.

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const mainStyle  = { maxWidth: 1200, margin: '2rem auto', padding: '2rem', background: 'var(--bg-secondary)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8 };
const cardStyle  = { background: 'var(--bg-accent)', padding: '1.5rem', borderRadius: 8, marginBottom: '1.5rem' };
const inputStyle = { width: '100%', padding: '0.8rem', border: '2px solid #D4AF37', borderRadius: 5, fontFamily: "'Open Sans', sans-serif", resize: 'vertical', minHeight: 90, background: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' };
const btnStyle   = { background: '#D4AF37', color: '#2C2C2C', border: 'none', padding: '0.6rem 1.4rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" };

const PostPage = () => {
  const { id }   = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post,        setPost]        = useState(null);
  const [comments,    setComments]    = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [commentErr,  setCommentErr]  = useState('');

  useEffect(() => {
    Promise.all([API.get(`/posts/${id}`), API.get(`/comments/${id}`)])
      .then(([p, c]) => { setPost(p.data); setComments(c.data); })
      .catch(() => setError('Post not found or has been removed.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async () => {
    if (!commentBody.trim()) { setCommentErr('Comment cannot be empty.'); return; }
    setCommentErr('');
    try {
      const { data } = await API.post(`/comments/${id}`, { body: commentBody });
      setComments(prev => [...prev, data]);
      setCommentBody('');
    } catch (err) {
      setCommentErr(err.response?.data?.message || 'Failed to post comment.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(prev => prev.filter(c => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment.');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Delete this post permanently?')) return;
    try {
      await API.delete(`/posts/${id}`);
      navigate('/home');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post.');
    }
  };

  if (loading) return <main style={mainStyle}><p style={{ fontStyle: 'italic', padding: '2rem' }}>Loading post...</p></main>;
  if (error)   return <main style={mainStyle}><p style={{ color: '#ff6b6b', padding: '2rem' }}>{error}</p><Link to='/home' style={{ color: '#8B4513', marginLeft: '2rem' }}>← Back to Home</Link></main>;

  const isOwner = user && post.author?._id === user._id;
  const isAdmin = user && user.role === 'admin';

  return (
    <main style={mainStyle}>

      {/* ── Post ── */}
      <article style={{ ...cardStyle, borderLeft: '5px solid #D4AF37' }}>
        {post.image && (
          <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title}
            style={{ width: '100%', maxHeight: 380, objectFit: 'cover', borderRadius: 8, margin: '0 0 1.5rem' }} />
        )}

        <h2 style={{ fontFamily: "'Merriweather', serif", fontSize: 'clamp(1.3rem,3vw,2rem)', marginBottom: '0.8rem' }}>{post.title}</h2>

        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem', color: '#D4AF37', fontSize: '0.88rem' }}>
          {post.author?.profilePic && (
            <img src={`http://localhost:5000/uploads/${post.author.profilePic}`} alt=''
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', margin: 0 }} />
          )}
          <span>By <strong>{post.author?.name}</strong></span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Body */}
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem' }}>{post.body}</div>

        {/* Edit / Delete — owner or admin */}
        {(isOwner || isAdmin) && (
          <div style={{ display: 'flex', gap: 12, marginTop: '1.5rem' }}>
            <Link to={`/edit-post/${post._id}`}
              style={{ background: '#D4AF37', color: '#2C2C2C', padding: '0.6rem 1.4rem', borderRadius: 5, fontWeight: 600, textDecoration: 'none', fontFamily: "'Open Sans', sans-serif" }}>
              Edit Post
            </Link>
            <button onClick={handleDeletePost}
              style={{ background: '#c0392b', color: 'white', border: 'none', padding: '0.6rem 1.4rem', borderRadius: 5, fontWeight: 600, cursor: 'pointer', fontFamily: "'Open Sans', sans-serif" }}>
              Delete Post
            </button>
          </div>
        )}
      </article>

      {/* ── Comments ── */}
      <section style={cardStyle}>
        <h3 style={{ fontFamily: "'Merriweather', serif", marginBottom: '1.2rem', borderBottom: '2px solid #D4AF37', paddingBottom: '0.5rem' }}>
          Comments ({comments.length})
        </h3>

        {comments.length === 0 && (
          <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '1rem' }}>No comments yet. Be the first!</p>
        )}

        {comments.map(c => (
          <div key={c._id} style={{ borderBottom: '1px solid var(--bg-secondary)', paddingBottom: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', color: '#D4AF37' }}>
                {c.author?.profilePic && (
                  <img src={`http://localhost:5000/uploads/${c.author.profilePic}`} alt=''
                    style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', margin: 0 }} />
                )}
                <strong>{c.author?.name}</strong>
                <span>· {new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              {user && (user._id === c.author?._id || user.role === 'admin') && (
                <button onClick={() => handleDeleteComment(c._id)}
                  style={{ background: 'transparent', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '0.8rem', fontFamily: "'Open Sans', sans-serif" }}>
                  Delete
                </button>
              )}
            </div>
            <p style={{ lineHeight: 1.7 }}>{c.body}</p>
          </div>
        ))}

        {/* Add comment */}
        {user ? (
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>Leave a Comment:</label>
            <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)}
              placeholder='Write your comment...' style={inputStyle} />
            {commentErr && <p style={{ color: '#ff6b6b', fontSize: '0.85rem', margin: '4px 0' }}>{commentErr}</p>}
            <button onClick={handleAddComment} style={{ ...btnStyle, marginTop: 8 }}>Post Comment</button>
          </div>
        ) : (
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
            <Link to='/login' style={{ color: '#8B4513' }}>Login</Link> to leave a comment.
          </p>
        )}
      </section>

      <Link to='/home' style={{ color: '#8B4513', fontWeight: 600 }}>← Back to Home</Link>
    </main>
  );
};
export default PostPage;
