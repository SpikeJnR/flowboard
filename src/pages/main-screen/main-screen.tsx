// MainScreen.jsx
import { useEffect } from 'react';

const MainScreen = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className='main'>
      {/* Hero / Welcome Section */}
      <section className='main__welcome'>
        <div className='main__shapes'>
          <div className='shape shape--circle' data-speed='0.2'></div>
          <div className='shape shape--square' data-speed='0.4'></div>
          <div className='shape shape--triangle' data-speed='0.3'></div>
        </div>

        <div className='main__content'>
          <h1 className='main__title animated fadeInDown'>Welcome to FlowBoard</h1>
          <p className='main__subtitle animated fadeInUp'>
            Organize your life and boost your productivity with our smart and simple task manager.
          </p>

          <div className='features animated fadeIn'>
            <div className='feature slide-in-left'>
              <h3>📝 Plan</h3>
              <p>Create structured task lists and stay focused on what matters most.</p>
            </div>
            <div className='feature slide-in-up'>
              <h3>📊 Track</h3>
              <p>Monitor your progress and keep deadlines under control.</p>
            </div>
            <div className='feature slide-in-right'>
              <h3>📁 Organize</h3>
              <p>Keep everything in one place: tasks, notes, priorities, and more.</p>
            </div>
          </div>

          <div className='images fade-in-delayed'>
            <img
              src='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80'
              alt='Productivity'
              loading='lazy'
            />
            <img
              src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'
              alt='Workflow'
              loading='lazy'
            />
            <img
              src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
              alt='Planning'
              loading='lazy'
            />
            <img
              src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80'
              alt='Organization'
              loading='lazy'
            />
          </div>

          <button
            className='cta bounce-in'
            onClick={() => {
              const featuresSection = document.getElementById('features');
              if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label='Start your journey by scrolling to features'
          >
            Start Your Journey
          </button>
        </div>
      </section>

      <section id='features' className='section section--features fade-in-on-scroll'>
        <div className='content'>
          <h2>Create & Organize Tasks</h2>
          <p>
            Effortlessly create tasks, assign due dates, set priorities, and categorize with tags or
            labels. Organize everything in one place.
          </p>
          <img src='images/login-slide1.svg' alt='Create tasks' loading='lazy' />
        </div>
      </section>

      <section className='section section--priorities  fade-in-on-scroll'>
        <div className='content'>
          <h2>Set Priorities & Deadlines</h2>
          <p>
            Stay ahead with smart reminders, color-coded priorities, and clearly defined deadlines.
            Boost your accountability.
          </p>
          <img src='images/login-slide2.svg' alt='Priorities and deadlines' loading='lazy' />
        </div>
      </section>

      <section className='section section--kanban fade-in-on-scroll'>
        <div className='content'>
          <h2>3 Powerful Kanban Boards</h2>
          <p>
            Visualize progress across three customizable boards: “To Do”, “In Progress”, and “Done”.
            Built for agile workflows.
          </p>
          <img src='images/login-slide3.svg' alt='Kanban boards' loading='lazy' />
        </div>
      </section>
    </div>
  );
};

export default MainScreen;
