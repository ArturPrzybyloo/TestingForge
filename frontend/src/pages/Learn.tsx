import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AcademicCapIcon,
  BookOpenIcon,
  CodeBracketIcon,
  ServerIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  icon: React.ReactNode;
}

const devToolsCourse: CourseModule[] = [
  {
    id: 'introduction',
    title: 'learn.course.introduction.title',
    description: 'learn.course.introduction.description',
    duration: '15 minutes',
    content: `learn.course.introduction.content`,
    icon: <BookOpenIcon className="h-8 w-8 text-green-500" />
  },
  {
    id: 'elements',
    title: 'learn.course.elements.title',
    description: 'learn.course.elements.description',
    duration: '20 minutes',
    content: `learn.course.elements.content`,
    icon: <CodeBracketIcon className="h-8 w-8 text-blue-500" />
  },
  {
    id: 'console',
    title: 'learn.course.console.title',
    description: 'learn.course.console.description',
    duration: '25 minutes',
    content: `learn.course.console.content`,
    icon: <ServerIcon className="h-8 w-8 text-green-500" />
  },
  {
    id: 'network',
    title: 'learn.course.network.title',
    description: 'learn.course.network.description',
    duration: '30 minutes',
    content: `learn.course.network.content`,
    icon: <RocketLaunchIcon className="h-8 w-8 text-blue-500" />
  },
  {
    id: 'performance',
    title: 'learn.course.performance.title',
    description: 'learn.course.performance.description',
    duration: '35 minutes',
    content: `learn.course.performance.content`,
    icon: <ChartBarIcon className="h-8 w-8 text-green-500" />
  }
];

const paidCourses = [
  {
    id: 'aiqa',
    titleKey: 'learn.course.aiqa.title',
    descriptionKey: 'learn.course.aiqa.description',
    levelKey: 'learn.course.aiqa.level',
    durationKey: 'learn.course.aiqa.duration',
    ctaKey: 'learn.course.aiqa.cta',
    icon: <RocketLaunchIcon className="h-10 w-10 text-blue-500" />,
    paid: true,
  },
];

const miniCourses = [
  {
    id: 'devtools',
    titleKey: 'learn.minicourse.devtools.title',
    descriptionKey: 'learn.minicourse.devtools.description',
    durationKey: 'learn.minicourse.devtools.duration',
    ctaKey: 'learn.minicourse.devtools.cta',
    icon: <AcademicCapIcon className="h-10 w-10 text-green-500" />,
    paid: false,
  },
];

const CourseDetail: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { t } = useTranslation();
  const module = devToolsCourse.find(m => m.id === moduleId);

  if (!module) {
    return <div className="text-center text-gray-400 py-12">{t('learn.moduleNotFound')}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Link to="/learn" className="mb-6 text-blue-400 hover:text-blue-300">{t('learn.backToCourses')}</Link>
      <h1 className="text-3xl font-bold mb-4">{t(module.title)}</h1>
      <p className="text-gray-400 mb-6">{t(module.description)}</p>
      <div className="bg-gray-800 rounded-xl p-6 whitespace-pre-line text-gray-200">
        {t(module.content)}
      </div>
    </div>
  );
};

const Learn: React.FC = () => {
  const { t } = useTranslation();
  const [expandedMini, setExpandedMini] = useState<string | null>(null);

  return (
    <>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          {t('learn.courses.title')} & {t('learn.minicourses.title')}
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          {t('learn.courses.description')} {t('learn.minicourses.description')}
        </p>
      </section>

      {/* Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">{t('learn.courses.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paidCourses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-xl p-8 flex flex-col relative opacity-70 cursor-not-allowed">
              <div className="flex items-center mb-4">{course.icon}<span className="ml-3 text-lg font-semibold">{t(course.titleKey)}</span></div>
              <p className="text-gray-400 mb-4">{t(course.descriptionKey)}</p>
              <div className="flex gap-4 mb-4">
                <span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded text-xs font-medium">{t(course.levelKey)}</span>
                <span className="bg-gray-700 px-3 py-1 rounded text-xs font-medium">{t(course.durationKey)}</span>
              </div>
              <button className="mt-auto bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors cursor-not-allowed" disabled>
                {t('learn.comingSoon')}
              </button>
              <span className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded">{t('learn.comingSoon')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">{t('learn.minicourses.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {miniCourses.map((course) => (
            <div key={course.id} className="bg-gray-800 rounded-xl p-8 flex flex-col">
              <div className="flex items-center mb-4">{course.icon}<span className="ml-3 text-lg font-semibold">{t(course.titleKey)}</span></div>
              <p className="text-gray-400 mb-4">{t(course.descriptionKey)}</p>
              <div className="flex gap-4 mb-4">
                <span className="bg-gray-700 px-3 py-1 rounded text-xs font-medium">{t(course.durationKey)}</span>
              </div>
              <button
                className="mt-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                onClick={() => setExpandedMini(expandedMini === course.id ? null : course.id)}
              >
                {t(course.ctaKey)}
              </button>
            </div>
          ))}
        </div>
        {/* Expanded Mini Course Lessons */}
        {expandedMini === 'devtools' && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-green-400">{t('learn.minicourse.devtools.title')}</h3>
            <div className="space-y-8">
              {devToolsCourse.map((lesson) => (
                <div key={lesson.id} className="bg-gray-700 rounded-xl p-6">
                  <div className="flex items-center mb-2">{lesson.icon}<span className="ml-3 text-lg font-semibold">{t(lesson.title)}</span></div>
                  <p className="text-gray-400 mb-2">{t(lesson.description)}</p>
                  <div className="text-xs text-gray-400 mb-2">{lesson.duration}</div>
                  <div className="bg-gray-800 rounded p-4 text-gray-200 whitespace-pre-line">{t(lesson.content)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export { Learn, CourseDetail }; 