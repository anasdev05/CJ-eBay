const slides=[...document.querySelectorAll('.slide')];let i=0;
const notes=[
'هذا المشروع هو CJ إلى eBay Unified Product Research Pipeline V13. الهدف ليس نشر المنتجات تلقائيًا، بل جمع مراحل البحث والمراجعة في مسار واحد: نبدأ من CJ، نفحص السوق على eBay، نحسب الشحن والربحية، ثم نستخدم AI والتصنيف الرسمي قبل أن يصل المنتج إلى قرار البائع.',
'المشكلة أن تقييم المنتج يدويًا يحتاج التنقل بين أكثر من مصدر. السعر المنخفض على CJ لا يعني تلقائيًا أن المنتج فرصة جيدة، لأننا نحتاج معرفة الشحن إلى السوق المستهدف، الأسعار المقارنة على eBay، الرسوم، ثم الفئة والخصائص المطلوبة. المشروع يجمع هذه الأدلة قبل اتخاذ القرار.',
'n8n هو المنسق الرئيسي. CJ APIs تستخدم للاكتشاف والمتغيرات والشحن، وeBay APIs تستخدم للبحث ثم التصنيف والخصائص الرسمية. مرحلة AI تراجع مدى تطابق المنتج مع دليل eBay ولا تملك صلاحية النشر. النتائج تحفظ في Data Tables وتظهر للمراجعة عبر الداشبورد.',
'المسار يبدأ من زر الداشبورد عبر Webhook محمي بمفتاح محلي. بعد ذلك ينفذ Discovery، ثم Freight للمرشحين المؤهلين، ثم Profitability، ثم AI Review وeBay Taxonomy. كل مرحلة لديها نتيجة واضحة، ويمكن تخطي مرحلة إذا لم يوجد مرشح مناسب بدل الاستمرار ببيانات غير صالحة.',
'المدخلات ليست مجرد اسم منتج. النظام يأخذ بيانات CJ الأساسية، ويجمع قوائم eBay النشطة للمقارنة، ثم يجلب Variant حقيقي وخيارات الشحن إلى الولايات المتحدة. الربحية تستخدم السعر الوسيط والتكلفة الواصلة، وفي النهاية يبقى قرار البائع منفصلًا بحالات الموافقة أو الرفض أو الانتظار.',
'في الاكتشاف يتم تطبيق فلاتر أمان ثم مقارنة نتائج eBay. في الشحن يتم اختيار متغير وفحص Freight فعلي عبر CJ. بعدها تحسب الربحية التقديرية مع رسوم واحتياطي. المنتجات الربحية فقط تنتقل لمراجعة AI، ثم يطلب النظام Category Suggestions والـOfficial Aspects من eBay ويحفظ كل النتائج.',
'هنا أفرق بين حدود النظام وبين نتائج تشغيل فعلية. الإعداد يسمح بحد أقصى 15 مرشحًا في الاكتشاف، بينما مرحلتا الشحن ومراجعة AI تختاران حتى 3 مرشحين. قرار البائع يبدأ PENDING. ملف الـWorkflow نفسه لا يحتوي سجل تنفيذ ثابت لعدد الفرص أو مدة آخر Run، لذلك لا أعرض أرقامًا غير موثقة. المخرجات هي فرص للمراجعة وليست Listings منشورة.',
'في العرض النهائي يمكن وضع لقطة الداشبورد ولقطة n8n هنا. الخلاصة أن المشروع يقلل العمل اليدوي لأنه يجمع بيانات السوق والشحن والربحية والـAI والتصنيف في مكان واحد. والأهم أن حدود الأمان واضحة: لا Draft تلقائي، لا Publish، لا Purchase، ولا Payment؛ هذه القرارات تبقى منفصلة وتحتاج موافقة المستخدم.'
];
function show(n){slides[i].classList.remove('active');i=(n+slides.length)%slides.length;slides[i].classList.add('active');document.getElementById('counter').textContent=`${i+1} / ${slides.length}`;}
document.getElementById('next').onclick=()=>show(i+1);
document.getElementById('prev').onclick=()=>show(i-1);
document.getElementById('full').onclick=()=>document.documentElement.requestFullscreen?.();
document.addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' ','Enter'].includes(e.key)){e.preventDefault();show(i+1);}
  if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1);}
  if(e.key==='f')document.documentElement.requestFullscreen?.();
});
show(0);
