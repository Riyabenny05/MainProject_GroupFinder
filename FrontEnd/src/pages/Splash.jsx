import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import splashVideo from '../assets/splash_viedo.mp4';

const Splash = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const cardData = [
    {
      title: 'Collaborative Learning',
      desc: 'Learn together, grow together. Build stronger understanding through group study.',
      emoji: '🤝',
      img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Discussion Driven',
      desc: 'Engage in meaningful academic discussions with like-minded learners.',
      emoji: '💬',
      img: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Share Resources',
      desc: 'Share notes, materials, and important links with your study group.',
      emoji: '📚',
      img: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Stay Motivated',
      desc: 'Keep up your momentum with the support and energy of your peers.',
      emoji: '🔥',
      img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Track Progress',
      desc: 'Monitor your group’s learning curve and celebrate each milestone.',
      emoji: '📈',
      img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Grow Together',
      desc: 'Build friendships, solve doubts, and thrive as a team.',
      emoji: '🌱',
      img: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Segoe UI', sans-serif;
          scroll-behavior: smooth;
        }
        ::selection {
          background: #dda0dd;
          color: #000;
        }
        .glow-text {
          background: linear-gradient(90deg, #dda0dd, #ffffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }
      `}</style>

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -2,
        }}
      >
        <source src={splashVideo} type="video/mp4" />
        
      </video>

      <Box
  sx={{
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
    zIndex: -1,
  }}
/>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          mt: 14,
          px: 2,
        }}
      >
        {/* Welcome Section */}
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: 'easeOut' }}
>
  <Box
    sx={{
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '24px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
      maxWidth: '90vw',
      width: '720px',
      p: 4,
      color: 'white',
    }}
  >
    <Typography variant="h2" className="glow-text">
      Welcome to MinGlo ♾
    </Typography>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mt: 1,
          mb: 3,
          color: '#ffd700',
          fontStyle: 'italic',
          fontSize: '1.1rem',
          fontWeight: '500',
        }}
      >
        "Alone we can do so little, together we can do so much." — Helen Keller
      </Typography>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8 }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        Struggling alone? Thrive together.  
        Join a tribe of curious minds. Share ideas, track progress, and grow together —  
        because learning is better when it's shared.  
        Study smart. Study social. Study with us.
      </Typography>
    </motion.div>

    <Button
      variant="contained"
      size="large"
      onClick={handleLoginClick}
      sx={{
        background: 'linear-gradient(to right, #dda0dd, #d186d1)',
        color: '#000',
        fontWeight: 'bold',
        px: 5,
        py: 1.5,
        borderRadius: '50px',
        boxShadow: '0 0 15px rgba(221,160,221,0.5)',
        '&:hover': {
          background: 'linear-gradient(to right, #d186d1, #dda0dd)',
          boxShadow: '0 0 25px rgba(221,160,221,0.7)',
        },
      }}
    >
      Join Now
    </Button>
  </Box>
</motion.div>

        {/* Feature Cards */}
        <Box
          sx={{
            mt: 6,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            maxWidth: '90vw',
            width: '1100px',
            mb: 6,
          }}
        >
          {cardData.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '18px',
                  p: 2.5,
                  color: '#fff',
                  textAlign: 'left',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={card.img}
                  alt={card.title}
                  sx={{
                    width: '100%',
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: '12px',
                    mb: 1.5,
                  }}
                />
                <Typography variant="h5" gutterBottom>
                  {card.emoji} {card.title}
                </Typography>
                <Typography variant="body2">{card.desc}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(8px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '1100px',
              p: 4,
              color: '#fff',
              mb: 6,
              mx: 'auto',
            }}
          >
            <Box
  component="img"
   src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"



  alt="Why Choose Us"
  sx={{
    width: { xs: '100%', md: '45%' },
    height: 'auto',
    borderRadius: '18px',
    objectFit: 'cover',
    mb: { xs: 2, md: 0 },
    mr: { md: 4 },
  }}
/>

            <Box textAlign="left">
              <Typography variant="h4" sx={{ mb: 1, color: '#dda0dd', fontWeight: 'bold' }}>
                Why Choose Us
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                MinGlo is more than just a study platform — it's a community built on curiosity, collaboration, and collective growth.
                Whether you're preparing for exams, sharing notes, or brainstorming together, MinGlo connects learners and fuels meaningful academic journeys.
              </Typography>
              <Typography variant="body2">
                We're here to help you find your tribe, stay motivated, and celebrate every milestone, big or small.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Terms and Conditions Section */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <Box
    sx={{
      maxWidth: '1000px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(6px)',
      borderRadius: '20px',
      p: 4,
      mb: 6,
      color: '#ccc',
      mx: 'auto',
      textAlign: 'left',
    }}
  >
    <Typography variant="h5" sx={{ color: '#dda0dd', fontWeight: 'bold', mb: 2 }}>
      Terms and Conditions 📜
    </Typography>
    
    {/* Enlarged content */}
    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.05rem', lineHeight: 1.8 }}>
      By joining MinGlo, you agree to respect the privacy and opinions of all group members.
    </Typography>
    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.05rem', lineHeight: 1.8 }}>
      All users are expected to share content that is academic, respectful, and free from plagiarism.
    </Typography>
    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.05rem', lineHeight: 1.8 }}>
      Discussions should remain focused on study-related topics that support collaborative learning.
    </Typography>
    <Typography variant="body1" sx={{ mb: 1, fontSize: '1.05rem', lineHeight: 1.8 }}>
      Any form of harassment, discrimination, or offensive behavior will not be tolerated.
    </Typography>
    <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
      We encourage an inclusive and supportive environment where everyone can learn and grow together.
    </Typography>
  </Box>
</motion.div>

{/* Group Owners Section */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <Box
    sx={{
      maxWidth: '800px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.2)',
      backdropFilter: 'blur(5px)',
      borderRadius: '16px',
      p: 4,
      mb: 6,
      color: '#fff',
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#dda0dd' }}>
      Group Owners 👥
    </Typography>
    <Typography variant="body1">👤 Riya Benny</Typography>
    <Typography variant="body1">👤 Dayona Suby</Typography>
    <Typography variant="body1">👤 Jofia Treesa George</Typography>
    <Typography variant="body1">👤 Karthik G</Typography>
  </Box>
</motion.div>


{/* Enquiries Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            sx={{
              maxWidth: '800px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(5px)',
              borderRadius: '16px',
              p: 4,
              mb: 8,
              color: '#fff',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#dda0dd' }}>
              For Any Enquiries 📞
            </Typography>
            <Typography variant="body1">📱 Riya Benny - 7847357690</Typography>
            <Typography variant="body1">📱 Dayona Suby - 2351908746</Typography>
            <Typography variant="body1">📱 Jofia Treesa George - 5839627384</Typography>
            <Typography variant="body1">📱 Karthik G - 6749375070</Typography>
          </Box>
        </motion.div>

      </Box>
    </>
  );
};

export default Splash;