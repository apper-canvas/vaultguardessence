import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/organisms/HeroSection';
import FeaturesSection from '@/components/organisms/FeaturesSection';
import SecurityStatsSection from '@/components/organisms/SecurityStatsSection';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Shield',
      title: 'Secure Storage',
      description: 'Military-grade encryption protects your passwords'
    },
    {
      icon: 'Key',
      title: 'Password Generator',
      description: 'Generate strong, unique passwords instantly'
    },
    {
      icon: 'Copy',
      title: 'Auto-fill',
      description: 'Quick copy and secure clipboard management'
    },
    {
      icon: 'Eye',
      title: 'Breach Monitor',
      description: 'Get alerts when your accounts are compromised'
    }
  ];

  return (
    <div className="min-h-full bg-background">
      <HeroSection 
        onOpenVault={() => navigate('/vault')}
        onGeneratePassword={() => navigate('/generator')}
      />
      <FeaturesSection features={features} />
      <SecurityStatsSection />
    </div>
  );
};

export default HomePage;