import './styles/styles.scss';
import Title from './components/Title.jsx'
import ProjectOverview from './components/ProjectOverview.jsx'
import Viz from './components/Viz';

function App() {
  return (
    <div>
      <div className="section-one">
        <Title />
      </div>
      <Viz/>
    </div>
  );
}

export default App;
