import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Award, Brain, Palette, Code, ChevronRight, Linkedin, Mail, Globe, Book } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AuthModal from './AuthModal';
import PaymentModal from './PaymentModal';

interface Instructor {
  name: string;
  role: string;
  avatar: string;
  description: string;
  stats: {
    courses: number;
    articles: number;
    students: number;
  };
  linkedin?: string;
  email?: string;
  medium?: string;
  website?: string;
  expertise: string[];
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  format: string;
  attendeeLimit: number;
  price?: number;
  xp?: number;
  description: string;
  skills: string[];
  imageUrl: string;
  learningOutcomes: string[];
  requirements: string[];
  instructor: Instructor;
}

const events: Record<string, Event> = {
  'ai-ux-workshop': {
    id: 'ai-ux-workshop',
    title: "AI-Powered UX Design Workshop",
    date: "March 15, 2024",
    time: "10:00 AM - 4:00 PM EST",
    format: "Virtual",
    attendeeLimit: 50,
    price: 100,
    xp: 500,
    description: `【AI時代的UX設計：打造智慧與人性的完美融合】

在人工智慧技術快速演進的今日，使用者體驗(UX)設計正經歷前所未有的轉變。隨著AI應用的普及，如何在保持人性化互動的同時，善用AI強大的運算與預測能力，已成為當代設計師最重要的課題。本次演講將深入探討AI如何徹底改變UX設計的方法論與思維模式，以及設計師該如何在這波技術浪潮中，創造更卓越的用戶體驗。

我們將從AI對UX設計流程的根本影響開始，探討設計師如何運用AI工具優化研究方法、擴展創意邊界，並提升設計效率。在智慧型介面設計方面，將深入剖析如何打造既能充分發揮AI性能，又能確保用戶掌控感的介面，並分享業界領先案例。同時，也會探討在AI驅動的個人化服務中，如何在提供卓越體驗的同時，妥善處理隱私保護與資訊透明度等關鍵議題。

講者將分享其在科技業第一線的實戰經驗，從最新的AI技術趨勢到實用的設計方法論，從理論到實踐，全方位探索AI時代的UX設計新典範。透過真實案例分析，參與者將能深入理解AI如何改變用戶行為與期待，以及設計師該如何因應這些轉變。最後，我們也將展望AI/UX設計的未來發展趨勢，探討設計師如何在AI浪潮中保持競爭力。

無論您是UX設計師、產品經理、開發者，還是對AI/UX領域有興趣的專業人士，都能在這場演講中獲得寶貴的洞見與實務技巧。在為期兩小時的演講中，講者也將預留充足時間與現場聽眾互動討論，讓參與者能夠針對自己關心的議題深入交流。`,
    skills: ['AI Integration', 'UX Research', 'Interface Design', 'Technical Implementation'],
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    learningOutcomes: [
      'Master AI-powered design tools and automation workflows',
      'Implement machine learning models in UX research',
      'Create adaptive and intelligent user interfaces',
      'Develop ethical AI integration strategies'
    ],
    requirements: [
      'Basic understanding of UX design principles',
      'Familiarity with design tools (Figma, Sketch)',
      'No coding experience required'
    ],
    instructor: {
      name: '温明輝',
      role: 'UX Research & Design Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      description: '40% 網路創業者 + 40 % 設計學院教授 + 20% UX 修行者與傳教士\n\n受過人因工程與人機互動研究的訓練，因此對於了解「使用者」的能力上具備了一定程度的學理基礎，而後的十年，我也由於擔任大學教授工作的關係，因此得已每年定期於課程上講授 UX 相關的主題課程，透過教學的壓力不斷推前與精進自己在 UX 上的新知吸收以及反思。\n\n由於「商業」與「技術」這兩種 UCD 能力，並不容易在自己熟悉的專業領域舒適圈中習得，因此在過去十年間，我也陸續創立及參與了五家新創網路公司的產品及營運，讓我得以在真實的市場實戰與磨練自己在商業思維及資訊技術上融會貫通的能力。除此之外，自2018年起，我也受邀到幾家外商及上公市公司擔任 UX 及數位轉型顧問的工作，加速了融合 UX 的三個核心能力實戰與思考，讓我專業上有了更進一步的領悟，演化出了《UX ‧ 三刀流》設計思維。',
      stats: {
        courses: 1,
        articles: 7,
        students: 22624
      },
      linkedin: 'https://www.linkedin.com/in/cis1979/',
      email: 'donwen@ntub.edu.tw',
      medium: 'https://medium.com/@donwen',
      website: 'http://uxerlab.com/',
      expertise: [
        'Human-Computer Interaction',
        'User Research',
        'User Experience Design'
      ]
    }
  }
};

export default function EventDetail() {
  const { id } = useParams();
  const event = id ? events[id] : null;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h2>
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleRegistration = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsRegistered(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="relative h-96">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.format}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Limited to {event.attendeeLimit} attendees</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">About This Workshop</h2>
              <div className="prose prose-indigo max-w-none">
                {event.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Learning Outcomes */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-indigo-600" />
                Learning Outcomes
              </h2>
              <ul className="space-y-4">
                {event.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-indigo-600" />
                Requirements
              </h2>
              <ul className="space-y-4">
                {event.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Price Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {event.price} EX3
                </div>
                <div className="text-gray-500">≈ $10.00 USD</div>
              </div>
              <button 
                onClick={handleRegistration}
                disabled={isRegistered}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 mb-4 ${
                  isRegistered
                    ? 'bg-green-100 text-green-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                }`}
              >
                {isRegistered ? 'Registered' : 'Register Now'}
              </button>
              <p className="text-sm text-gray-500 text-center">
                30-day money-back guarantee
              </p>
            </div>

            {/* Instructor Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Instructor</h2>
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={event.instructor.avatar}
                  alt={event.instructor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {event.instructor.name}
                  </h3>
                  <p className="text-gray-600">{event.instructor.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">
                    {event.instructor.stats.courses}
                  </div>
                  <div className="text-sm text-gray-500">Courses</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">
                    {event.instructor.stats.articles}
                  </div>
                  <div className="text-sm text-gray-500">Articles</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-900">
                    {event.instructor.stats.students}
                  </div>
                  <div className="text-sm text-gray-500">Students</div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-gray-600 mb-6">
                {event.instructor.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="space-y-3">
                {event.instructor.linkedin && (
                  <a
                    href={event.instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn Profile
                  </a>
                )}
                {event.instructor.email && (
                  <a
                    href={`mailto:${event.instructor.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    {event.instructor.email}
                  </a>
                )}
                {event.instructor.website && (
                  <a
                    href={event.instructor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    Personal Website
                  </a>
                )}
                {event.instructor.medium && (
                  <a
                    href={event.instructor.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Book className="w-5 h-5" />
                    Medium Blog
                  </a>
                )}
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-600" />
                Skills Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {event.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        price={event.price || 0}
        title={event.title}
      />
    </div>
  );
}