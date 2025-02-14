import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import CatDetails from "./container/catDetails";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto p-4">
        <CatDetails />
      </div>
    </QueryClientProvider>
  );
};

export default App;
