import { StoreProvider, useStore } from './store';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RegistryLog from './components/RegistryLog';
import FileMovementTracker from './components/FileMovementTracker';
import RetentionPolicies from './components/RetentionPolicies';

function Main() {
  const { activeTab } = useStore();

  return (
    <Layout>
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'registry' && <RegistryLog />}
      {activeTab === 'movement' && <FileMovementTracker />}
      {activeTab === 'retention' && <RetentionPolicies />}
    </Layout>
  );
}

function App() {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
}

export default App;
