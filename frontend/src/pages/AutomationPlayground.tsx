import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const modules = [
  {
    key: 'dynamic-ui',
    labelKey: 'playground.module.dynamicUI.label',
    titleKey: 'playground.module.dynamicUI.title',
    descriptionKey: 'playground.module.dynamicUI.description',
    tipsKey: 'playground.module.dynamicUI.tips',
  },
  {
    key: 'ajax',
    labelKey: 'playground.module.ajax.label',
    titleKey: 'playground.module.ajax.title',
    descriptionKey: 'playground.module.ajax.description',
    tipsKey: 'playground.module.ajax.tips',
  },
  {
    key: 'form',
    labelKey: 'playground.module.form.label',
    titleKey: 'playground.module.form.title',
    descriptionKey: 'playground.module.form.description',
    tipsKey: 'playground.module.form.tips',
  },
  {
    key: 'iframe',
    labelKey: 'playground.module.iframe.label',
    titleKey: 'playground.module.iframe.title',
    descriptionKey: 'playground.module.iframe.description',
    tipsKey: 'playground.module.iframe.tips',
  },
  {
    key: 'table',
    labelKey: 'playground.module.table.label',
    titleKey: 'playground.module.table.title',
    descriptionKey: 'playground.module.table.description',
    tipsKey: 'playground.module.table.tips',
  },
  {
    key: 'select',
    labelKey: 'playground.module.select.label',
    titleKey: 'playground.module.select.title',
    descriptionKey: 'playground.module.select.description',
    tipsKey: 'playground.module.select.tips',
  },
  {
    key: 'choices',
    labelKey: 'playground.module.choices.label',
    titleKey: 'playground.module.choices.title',
    descriptionKey: 'playground.module.choices.description',
    tipsKey: 'playground.module.choices.tips',
  },
  {
    key: 'drag-drop',
    labelKey: 'playground.module.dragDrop.label',
    titleKey: 'playground.module.dragDrop.title',
    descriptionKey: 'playground.module.dragDrop.description',
    tipsKey: 'playground.module.dragDrop.tips',
  },
  {
    key: 'file-upload',
    labelKey: 'playground.module.fileUpload.label',
    titleKey: 'playground.module.fileUpload.title',
    descriptionKey: 'playground.module.fileUpload.description',
    tipsKey: 'playground.module.fileUpload.tips',
  },
  {
    key: 'alerts',
    labelKey: 'playground.module.alerts.label',
    titleKey: 'playground.module.alerts.title',
    descriptionKey: 'playground.module.alerts.description',
    tipsKey: 'playground.module.alerts.tips',
  },
  {
    key: 'localization',
    labelKey: 'playground.module.localization.label',
    titleKey: 'playground.module.localization.title',
    descriptionKey: 'playground.module.localization.description',
    tipsKey: 'playground.module.localization.tips',
  },
];

// --- Module Components ---

// 1. Dynamic UI
function DynamicUIModule() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setVisible((v) => !v);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const tips = t('playground.module.dynamicUI.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.dynamicUI.simulation')}</p>
      <div className="h-20 flex items-center">
        {visible && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow"
          >
            {t('playground.module.dynamicUI.button')}
          </button>
        )}
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 2. AJAX Requests
function AjaxModule() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setData(['Alpha', 'Bravo', 'Charlie', 'Delta']);
      setLoading(false);
    }, 3000);
  };

  const tips = t('playground.module.ajax.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.ajax.simulation')}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow mb-4"
        onClick={handleLoad}
        disabled={loading}
      >
        {loading ? t('playground.module.ajax.loading') : t('playground.module.ajax.loadData')}
      </button>
      {loading && <span className="ml-2 animate-spin inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full align-middle"></span>}
      <div className="mt-4 flex gap-4">
        {data.map((item) => (
          <button
            key={item}
            className="bg-gray-700 hover:bg-green-500 hover:text-white text-gray-200 px-4 py-2 rounded-lg font-medium"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 3. Form Validation
function FormModule() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{[k:string]:string}>({});

  const validate = () => {
    const errs: {[k:string]:string} = {};
    if (!name) errs.name = t('playground.module.form.errorName');
    if (!email.includes('@')) errs.email = t('playground.module.form.errorEmail');
    if (!/^[\d]{9,}$/.test(phone)) errs.phone = t('playground.module.form.errorPhone');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) alert(t('playground.module.form.success'));
  };

  const tips = t('playground.module.form.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.form.simulation')}</p>
      <form className="space-y-4 max-w-md" onSubmit={handleSubmit} autoComplete="off">
        <div>
          <label className="block text-gray-400 mb-1">{t('playground.module.form.name')}</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={validate}
          />
          {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
        </div>
        <div>
          <label className="block text-gray-400 mb-1">{t('playground.module.form.email')}</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={validate}
          />
          {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
        </div>
        <div>
          <label className="block text-gray-400 mb-1">{t('playground.module.form.phone')}</label>
          <input
            className="w-full p-2 rounded bg-gray-700 text-white"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            onBlur={validate}
          />
          {errors.phone && <div className="text-red-400 text-sm mt-1">{errors.phone}</div>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium shadow mt-2"
        >
          {t('playground.module.form.submit')}
        </button>
      </form>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 4. iFrames & Modals
function IframeModule() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // Inline iframe content as a string
  const iframeHtml = `
    <html><body style='background:#232b39;color:#e5e7eb;font-family:sans-serif;'>
      <button id='open-modal' style='margin:40px auto;display:block;padding:10px 24px;background:#38bdf8;color:#181f2a;border:none;border-radius:8px;font-size:16px;cursor:pointer;'>${t('playground.module.iframe.openModal')}</button>
      <div id='modal' style='display:none;position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(30,41,59,0.95);align-items:center;justify-content:center;z-index:10;'>
        <div style='background:#181f2a;padding:32px 40px;border-radius:16px;box-shadow:0 2px 12px #0006;text-align:center;'>
          <h2 style='color:#38bdf8;margin-bottom:16px;'>${t('playground.module.iframe.modalTitle')}</h2>
          <button id='hidden-flag' style='margin-top:24px;padding:10px 24px;background:#22d3ee;color:#181f2a;border:none;border-radius:8px;font-size:16px;cursor:pointer;'>${t('playground.module.iframe.button')}</button>
        </div>
      </div>
      <script>
        document.getElementById('open-modal').onclick = function() {
          document.getElementById('modal').style.display = 'flex';
        };
        document.getElementById('hidden-flag').onclick = function() {
          parent.postMessage('iframe-flag', '*');
        };
      </script>
    </body></html>
  `;

  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.iframe.simulation')}</p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow mb-4"
        onClick={() => setOpen(true)}
      >
        {t('playground.module.iframe.openIframe')}
      </button>
      <div className="mt-4">
        {open && (
          <iframe
            title="playground-iframe"
            srcDoc={iframeHtml}
            style={{ width: 400, height: 350, borderRadius: 16, border: '2px solid #334155', background: '#232b39' }}
          />
        )}
      </div>
    </div>
  );
}

// 5. Tables & Lists
function TableModule() {
  const { t } = useTranslation();
  const [sortAsc, setSortAsc] = useState(true);
  const [products] = useState([
    { name: t('playground.module.table.product1'), price: 19.99 },
    { name: t('playground.module.table.product2'), price: 9.99 },
    { name: t('playground.module.table.product3'), price: 14.99 },
    { name: t('playground.module.table.product4'), price: 24.99 },
  ]);

  const sorted = [...products].sort((a, b) => sortAsc ? a.price - b.price : b.price - a.price);

  const handleSort = () => setSortAsc((asc) => !asc);

  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.table.simulation')}</p>
      <table className="w-full bg-gray-700 rounded-xl overflow-hidden mb-4">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 cursor-pointer select-none" onClick={handleSort}>
              {t('playground.module.table.product')}
            </th>
            <th className="text-left px-4 py-2 cursor-pointer select-none" onClick={handleSort}>
              {t('playground.module.table.price')} {sortAsc ? '▲' : '▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((prod, idx) => (
            <tr key={prod.name}>
              <td className="px-4 py-2">{prod.name}</td>
              <td className="px-4 py-2">${prod.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- New Module: Select Dropdown ---
function SelectModule() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const tips = t('playground.module.select.tips').split('. ').filter((tip: string) => tip.trim());
  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.select.simulation')}</p>
      <label className="block text-gray-400 mb-2">{t('playground.module.select.choose')}</label>
      <select
        className="w-full p-2 rounded bg-gray-700 text-white mb-4 border border-gray-600 focus:border-blue-400 outline-none"
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        <option value="">-- {t('playground.module.select.select')} --</option>
        <option value="apple">{t('playground.module.select.apple')}</option>
        <option value="banana">{t('playground.module.select.banana')}</option>
        <option value="cherry">{t('playground.module.select.cherry')}</option>
        <option value="grape">{t('playground.module.select.grape')}</option>
      </select>
      {selected && <div className="text-green-400 font-mono">{t('playground.module.select.selected', { value: selected })}</div>}
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- New Module: Checkboxes & Radios ---
function ChoicesModule() {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<{[k:string]:boolean}>({
    newsletter: false,
    updates: false,
  });
  const [radio, setRadio] = useState('');
  const tips = t('playground.module.choices.tips').split('. ').filter((tip: string) => tip.trim());
  return (
    <div>
      <p className="mb-4 text-gray-300">{t('playground.module.choices.simulation')}</p>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">{t('playground.module.choices.subscribe')}</label>
        <label className="inline-flex items-center mr-6">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-400"
            checked={checked.newsletter}
            onChange={e => setChecked(c => ({ ...c, newsletter: e.target.checked }))}
          />
          <span className="ml-2">{t('playground.module.choices.newsletter')}</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-400"
            checked={checked.updates}
            onChange={e => setChecked(c => ({ ...c, updates: e.target.checked }))}
          />
          <span className="ml-2">{t('playground.module.choices.updates')}</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">{t('playground.module.choices.choosePlan')}</label>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-400"
            checked={radio === 'basic'}
            onChange={() => setRadio('basic')}
            name="plan"
          />
          <span className="ml-2">{t('playground.module.choices.basic')}</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio h-5 w-5 text-green-500 bg-gray-700 border-gray-600 focus:ring-green-400"
            checked={radio === 'pro'}
            onChange={() => setRadio('pro')}
            name="plan"
          />
          <span className="ml-2">{t('playground.module.choices.pro')}</span>
        </label>
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- New Module: Drag & Drop ---
function DragDropModule() {
  const { t } = useTranslation();
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: t('playground.module.dragDrop.todo') + ' 1', status: 'todo' },
    { id: 2, text: t('playground.module.dragDrop.todo') + ' 2', status: 'todo' },
    { id: 3, text: t('playground.module.dragDrop.todo') + ' 3', status: 'todo' },
  ]);
  const [inProgressItems, setInProgressItems] = useState([
    { id: 4, text: t('playground.module.dragDrop.inProgress') + ' 1', status: 'progress' },
  ]);
  const [doneItems, setDoneItems] = useState([
    { id: 5, text: t('playground.module.dragDrop.done') + ' 1', status: 'done' },
  ]);

  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const itemData = JSON.parse(e.dataTransfer.getData('text/plain'));
    if (itemData.status === 'todo') {
      setTodoItems(prev => prev.filter(item => item.id !== itemData.id));
    } else if (itemData.status === 'progress') {
      setInProgressItems(prev => prev.filter(item => item.id !== itemData.id));
    } else if (itemData.status === 'done') {
      setDoneItems(prev => prev.filter(item => item.id !== itemData.id));
    }
    const updatedItem = { ...itemData, status: targetStatus };
    if (targetStatus === 'todo') {
      setTodoItems(prev => [...prev, updatedItem]);
    } else if (targetStatus === 'progress') {
      setInProgressItems(prev => [...prev, updatedItem]);
    } else if (targetStatus === 'done') {
      setDoneItems(prev => [...prev, updatedItem]);
    }
  };

  // Tips jako lista zdań
  const tips = t('playground.module.dragDrop.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* To Do Column */}
        <div 
          className="bg-gray-700 rounded-lg p-4 min-h-48"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'todo')}
          data-testid="todo-column"
        >
          <h3 className="text-lg font-semibold mb-3 text-blue-400">{t('playground.module.dragDrop.todo')} ({todoItems.length})</h3>
          {todoItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-blue-600 p-3 rounded mb-2 cursor-move hover:bg-blue-500 transition-colors"
              data-testid={`todo-item-${item.id}`}
            >
              {item.text}
            </div>
          ))}
        </div>
        {/* In Progress Column */}
        <div 
          className="bg-gray-700 rounded-lg p-4 min-h-48"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'progress')}
          data-testid="progress-column"
        >
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">{t('playground.module.dragDrop.inProgress')} ({inProgressItems.length})</h3>
          {inProgressItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-yellow-600 p-3 rounded mb-2 cursor-move hover:bg-yellow-500 transition-colors"
              data-testid={`progress-item-${item.id}`}
            >
              {item.text}
            </div>
          ))}
        </div>
        {/* Done Column */}
        <div 
          className="bg-gray-700 rounded-lg p-4 min-h-48"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'done')}
          data-testid="done-column"
        >
          <h3 className="text-lg font-semibold mb-3 text-green-400">{t('playground.module.dragDrop.done')} ({doneItems.length})</h3>
          {doneItems.map(item => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className="bg-green-600 p-3 rounded mb-2 cursor-move hover:bg-green-500 transition-colors"
              data-testid={`done-item-${item.id}`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.module.dragDrop.automationTips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- New Module: File Upload & Download ---
function FileUploadModule() {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
        const url = URL.createObjectURL(file);
        setDownloadUrl(url);
      }, 2000);
    }
  };

  // Tips jako lista zdań
  const tips = t('playground.module.fileUpload.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">{t('playground.module.fileUpload.area')}</h3>
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          data-testid="file-input"
          accept=".txt,.pdf,.jpg,.png"
        />
        {uploadStatus === 'uploading' && (
          <div className="mt-4 flex items-center text-yellow-400" data-testid="upload-progress">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
            {t('playground.module.fileUpload.uploading')}
          </div>
        )}
        {uploadedFile && uploadStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg" data-testid="upload-success">
            <h4 className="font-semibold">{t('playground.module.fileUpload.success')}</h4>
            <p className="text-sm">{t('playground.module.fileUpload.file')}: {uploadedFile.name}</p>
            <p className="text-sm">{t('playground.module.fileUpload.size')}: {Math.round(uploadedFile.size / 1024)} KB</p>
            {downloadUrl && (
              <a
                href={downloadUrl}
                download={uploadedFile.name}
                className="inline-block mt-2 bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-gray-100"
                data-testid="download-link"
              >
                {t('playground.module.fileUpload.download')}
              </a>
            )}
          </div>
        )}
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.module.fileUpload.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- New Module: Browser Alerts & Confirms ---
function AlertsModule() {
  const { t } = useTranslation();
  const [lastAction, setLastAction] = useState('');

  const showAlert = () => {
    window.alert('This is a test alert! Click OK to continue.');
    setLastAction(t('playground.module.alerts.showAlert'));
  };

  const showConfirm = () => {
    const result = window.confirm('Do you want to delete this item?');
    if (result) {
      setLastAction('Confirm: User clicked OK - Item deleted');
    } else {
      setLastAction('Confirm: User clicked Cancel - Action cancelled');
    }
  };

  const showPrompt = () => {
    const result = window.prompt('Enter your name:');
    if (result) {
      setLastAction(`Prompt: User entered "${result}"`);
    } else {
      setLastAction('Prompt: User cancelled or entered empty value');
    }
  };

  // Tips jako lista zdań
  const tips = t('playground.module.alerts.tips').split('. ').filter((tip: string) => tip.trim());

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button
          onClick={showAlert}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium"
          data-testid="alert-button"
        >
          {t('playground.module.alerts.showAlert')}
        </button>
        <button
          onClick={showConfirm}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium"
          data-testid="confirm-button"
        >
          {t('playground.module.alerts.showConfirm')}
        </button>
        <button
          onClick={showPrompt}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium"
          data-testid="prompt-button"
        >
          {t('playground.module.alerts.showPrompt')}
        </button>
      </div>
      {lastAction && (
        <div className="bg-gray-700 rounded-lg p-4 mb-6" data-testid="action-result">
          <h4 className="font-semibold text-green-400 mb-2">{t('playground.module.alerts.lastAction')}</h4>
          <p className="text-gray-300">{lastAction}</p>
        </div>
      )}
      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">{t('playground.module.alerts.tips')}</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- New Module: Localization & Language Switching ---
function LocalizationModule() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  const tips = [
    'Test language switching by clicking language selectors',
    'Verify text changes in multiple UI elements after language switch',
    'Check that page layouts adapt to different text lengths',
    'Test RTL (right-to-left) languages if supported',
    'Validate that form labels, error messages, and tooltips are translated'
  ];

  return (
    <div>
      <p className="mb-4 text-gray-300">Practice testing multi-language applications and localization</p>
      
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Language Selector</h3>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 rounded-lg font-medium ${currentLang === 'en' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
            data-testid="lang-en"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('pl')}
            className={`px-4 py-2 rounded-lg font-medium ${currentLang === 'pl' ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
            data-testid="lang-pl"
          >
            Polski
          </button>
        </div>
        
        <div className="space-y-4">
          <div data-testid="welcome-text">
            <h4 className="font-semibold text-blue-400">
              {t('playground.module.localization.welcome')}
            </h4>
          </div>
          
          <div data-testid="description-text">
            <p className="text-gray-300">
              {t('playground.module.localization.description_text')}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium" data-testid="start-button">
              {t('playground.module.localization.start_learning')}
            </button>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded font-medium" data-testid="help-button">
              {t('playground.module.localization.help')}
            </button>
          </div>
          
          <div className="text-sm text-gray-400" data-testid="current-lang">
            {t('playground.module.localization.current_language')}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">Automation Tips</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {tips.map((tip: string, idx: number) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Main Page ---

const AutomationPlayground: React.FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(modules[0].key);
  const selectedModule = modules.find((m) => m.key === selected)!;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">
          {t('playground.title')}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          {t('playground.description')}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 rounded-2xl p-4 flex flex-col gap-2 h-fit self-start">
          {modules.map((mod) => (
            <button
              key={mod.key}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors mb-1 ${selected === mod.key ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
              onClick={() => setSelected(mod.key)}
            >
              {t(mod.labelKey)}
            </button>
          ))}
        </aside>
        {/* Main Panel */}
        <main className="flex-1 bg-gray-800 rounded-2xl p-8 min-h-[400px] shadow-lg">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
            {t(selectedModule.titleKey)}
          </h2>
          <p className="mb-6 text-gray-400">{t(selectedModule.descriptionKey)}</p>
          <div>
            {selected === 'dynamic-ui' && <DynamicUIModule />}
            {selected === 'ajax' && <AjaxModule />}
            {selected === 'form' && <FormModule />}
            {selected === 'iframe' && <IframeModule />}
            {selected === 'table' && <TableModule />}
            {selected === 'select' && <SelectModule />}
            {selected === 'choices' && <ChoicesModule />}
            {selected === 'drag-drop' && <DragDropModule />}
            {selected === 'file-upload' && <FileUploadModule />}
            {selected === 'alerts' && <AlertsModule />}
            {selected === 'localization' && <LocalizationModule />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AutomationPlayground;