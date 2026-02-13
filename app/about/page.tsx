'use client';

import Image from 'next/image';
import { FaHeartbeat, FaHandHoldingHeart, FaHospitalSymbol, FaUsers, FaLeaf, FaQuran } from 'react-icons/fa';
import BackToHome from '@/components/back-to-home';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-10 px-2">
      <BackToHome />
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-6 md:p-10 border border-blue-100 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/img/image1.webp"
              alt="دار الشفاء وهران"
              width={400}
              height={400}
              className="rounded-xl shadow-lg border border-blue-200"
              priority
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-2">
            <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2 mb-2">
              <FaHospitalSymbol className="text-blue-700" /> دار الشفاء لعلاج مرضى السرطان
            </h1>
            <span className="text-lg text-blue-600 font-semibold mb-2">وهران - الجزائر</span>
            <div className="flex flex-wrap gap-3 mb-2">
              <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                <FaHeartbeat /> علاج بالطب النبوي
              </span>
              <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">
                <FaLeaf /> الأعشاب الطبيعية
              </span>
              <span className="flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-lg text-sm font-medium">
                <FaHandHoldingHeart /> جلسات حجامة
              </span>
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm font-medium">
                <FaQuran /> رقية شرعية
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 text-sm mb-2">
              <FaUsers className="text-blue-600" /> عشرات المرضى يومياً - دعم مجاني 100%
            </div>
          </div>
        </div>
        <div className="text-slate-800 leading-relaxed text-lg mb-6 animate-fade-in">
          دار الشفاء لعلاج مرضى السرطان في وهران هي مبادرة إنسانية رائعة وفريدة من نوعها، تعمل 100% في سبيل الله مجاناً تماماً بدون أي مقابل مادي، يديرها أخونا الكريم الأستاذ عادل الحاسي وفريقه المتطوع حفظهم الله، وهي متخصصة في تقديم العلاج بالطب النبوي والحجامة والأعشاب الطبيعية والرقية الشرعية لمرضى السرطان من جميع أنحاء الجزائر وحتى من خارجها. يستقبل المركز يومياً عشرات المرضى في مراحل مختلفة من المرض، ويوفر لهم جلسات حجامة مكثفة، زيوت طبيعية، خلطات أعشاب مجربة، غذاء علاجي خاص، وجلسات رقية شرعية يومية بالقرآن الكريم، والحمد لله الكثير من الحالات شهدت تحسناً ملحوظاً بل وشفاء تاماً بإذن الله تعالى. المركز يعتمد كلياً على التبرعات والصدقات فقط، وكل من يعمل فيه متطوع في سبيل الله، لا يأخذ أجرة ولا يطلب شيئاً، بل يفتحون أبوابهم لكل محتاج، ويقدمون حتى المبيت والطعام لبعض المرضى القادمين من بعيد. هذه الدار أصبحت بفضل الله منارة أمل حقيقية لمرضى السرطان الميسورين وغير الميسورين، وكل يوم نسمع قصص شفاء تجعل القلب يعتصر فرحاً ودموع الفرحة تنهمر. جزى الله الأخ عادل الحاسي وكل المتطوعين خير الجزاء، وجعلهم في ميزان حسناتهم، وشفى الله كل مريض يقصد هذه الدار المباركة في سبيل الله.
        </div>
        <div className="bg-blue-50 rounded-xl p-4 text-center text-blue-800 font-semibold text-lg shadow-md mb-4 animate-fade-in">
          إذا كان عندك مريض أو تعرف أحداً محتاج، المكان موجود بحي 1300 مسكن عدل - الحاسي - وهران، والرقم ينتشر دائماً في المجموعات الخيرية، والله هو الشافي. 🤲🏻❤️
        </div>
        <div className="flex flex-col items-center gap-2 mt-6">
          <span className="text-slate-600 text-sm">كل العمل مجاني 100% - المركز يعتمد على التبرعات والصدقات فقط</span>
          <span className="text-blue-700 font-bold">جزى الله الأستاذ عادل الحاسي وكل المتطوعين خير الجزاء</span>
        </div>
      </div>
    </div>
  );
}