import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InputPanel from './components/InputPanel';
import DepartmentCards from './components/DepartmentCards';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleAnalyze = async ({ text, imageBase64, mimeType, liveLocation }) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          imageBase64,
          mimeType,
          liveLocation,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error during analysis');
      }

      const data = await response.json();
      setAnalysisResult(data);

      // Smooth scroll to analysis result
      setTimeout(() => {
        const element = document.getElementById('analysis-result');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      console.error('[Sociofy App] Analysis request failed:', error);
      setErrorMessage(
        'We encountered a temporary connection issue. Please verify your details or try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNew = () => {
    setAnalysisResult(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'high-contrast' : ''}`}>
      
      {/* Navigation Header */}
      <Header
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        largeText={largeText}
        setLargeText={setLargeText}
      />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero largeText={largeText} />

        {/* Input Panel Container */}
        <InputPanel
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          largeText={largeText}
        />

        {/* User-friendly Error Alert */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 flex items-center space-x-3 shadow-md">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div className="flex-grow text-xs sm:text-sm">
                <span className="font-bold">Analysis Note:</span> {errorMessage}
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-bold text-red-600 hover:text-red-800 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Analysis Results View or Department Cards View */}
        {analysisResult ? (
          <AnalysisResult
            result={analysisResult}
            onStartNew={handleStartNew}
            largeText={largeText}
          />
        ) : (
          <DepartmentCards />
        )}

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
