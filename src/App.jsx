import React, { useState, useEffect, useMemo } from 'react';
import { Home, ShieldCheck, Plus, ArrowUpCircle } from 'lucide-react';

const generateHouses = () => {
  const houses = [];
  const a14Numbers = [20, 26, 33, 35, 36, 37];
  a14Numbers.forEach(num => houses.push(`A14/${num}`));
  for (let i = 21; i <= 39; i++) houses.push(`A15/${i}`);
  for (let i = 1; i <= 12; i++) houses.push(`A16/${i < 10 ? '0'+i : i}`);
  for (let i = 1; i <= 20; i++) {
    if (i === 13) continue;
    houses.push(`A17/${i < 10 ? '0'+i : i}`);
  }
  return houses;
};

const HOUSE_LIST = generateHouses();
const WEEKS = [1, 2, 3, 4, 5];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

const formatRp = (angka) => new Intl.NumberFormat('id-ID', { 
  style: 'currency', 
  currency: 'IDR', 
  minimumFractionDigits: 0, 
  maximumFractionDigits: 0 
}).format(angka || 0);

export default function App() {
  const [activeTab, setActiveTab] = useState('pemasukan');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  
  // State dengan inisialisasi dari localStorage (Auto-Save)
  const [jimpitanData, setJimpitanData] = useState(() => 
    JSON.parse(localStorage.getItem('jimpitanData')) || {}
  );
  const [expenses, setExpenses] = useState(() => 
    JSON.parse(localStorage.getItem('expenses')) || []
  );
  const [newExp, setNewExp] = useState({ 
    amount: '', 
    desc: '', 
    date: new Date().toISOString().split('T')[0] 
  });

  // Efek untuk menyimpan ke localStorage setiap ada perubahan
  useEffect(() => { 
    localStorage.setItem('jimpitanData', JSON.stringify(jimpitanData)); 
  }, [jimpitanData]);
  
  useEffect(() => { 
    localStorage.setItem('expenses', JSON.stringify(expenses)); 
  }, [expenses]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === 'pradana12345') { 
      setIsAdmin(true); 
      setShowLoginModal(false); 
      setPinInput(''); 
    }
  };

  const handleAddExpense = () => {
    if (!newExp.amount || !newExp.desc || !newExp.date) return;
    const dateObj = new Date(newExp.date);
    setExpenses([...expenses, { 
      id: Date.now(), 
      ...newExp, 
      month: dateObj.getMonth() + 1, 
      year: dateObj.getFullYear() 
    }]);
    setNewExp({ amount: '', desc: '', date: new Date().toISOString().split('T')[0] });
  };

  const currentMonthIncome = useMemo(() => 
    HOUSE_LIST.reduce((acc, h) => 
      acc + WEEKS.reduce((s, w) => 
        s + (jimpitanData[`${h}-${selectedYear}-${selectedMonth}-${w}`] || 0), 0), 0), 
    [jimpitanData, selectedYear, selectedMonth]
  );
  
  const currentMonthExpense = useMemo(() => 
    expenses
      .filter(e => e.month === selectedMonth && e.year === selectedYear)
      .reduce((s, e) => s + Number(e.amount), 0), 
    [expenses, selectedMonth, selectedYear]
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 text-sm">
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Login Admin</h2>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Masukkan PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-4 bg-emerald-600 text-white font-bold text-center flex items-center justify-between">
        <span>Aplikasi Jimpitan TAS 8</span>
        <button 
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-2 bg-white text-emerald-600 px-3 py-1 rounded font-bold"
        >
          <ShieldCheck size={18} />
          Admin
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-4 bg-white border-b sticky top-0 z-10">
        <button
          onClick={() => setActiveTab('pemasukan')}
          className={`flex items-center gap-2 px-4 py-2 rounded font-bold ${
            activeTab === 'pemasukan' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          <Home size={18} /> Pemasukan
        </button>
        <button
          onClick={() => setActiveTab('pengeluaran')}
          className={`flex items-center gap-2 px-4 py-2 rounded font-bold ${
            activeTab === 'pengeluaran' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          <ArrowUpCircle size={18} /> Pengeluaran
        </button>
      </div>

      {/* Year & Month Selector */}
      <div className="p-4 bg-white border-b flex gap-4 items-center justify-center">
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border rounded font-bold"
        >
          {[2023, 2024, 2025, 2026].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="p-2 border rounded font-bold"
        >
          {MONTHS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
        </select>
      </div>

      <main className="p-4 max-w-6xl mx-auto">
        {activeTab === 'pemasukan' && (
          <div>
            <div className="bg-emerald-100 border border-emerald-500 p-4 rounded mb-4">
              <p className="text-emerald-800 font-bold">Total Pemasukan {MONTHS[selectedMonth - 1]} {selectedYear}</p>
              <p className="text-2xl font-bold text-emerald-600">{formatRp(currentMonthIncome)}</p>
            </div>
            
            {isAdmin && (
              <div className="bg-blue-50 border border-blue-300 p-4 rounded mb-4">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Plus size={18} /> Input Data Jimpitan</h3>
                <div className="space-y-2">
                  <select className="w-full p-2 border rounded" id="houseSelect">
                    <option value="">Pilih Rumah</option>
                    {HOUSE_LIST.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  <select className="w-full p-2 border rounded" id="weekSelect">
                    <option value="">Pilih Minggu</option>
                    {WEEKS.map(w => <option key={w} value={w}>Minggu {w}</option>)}
                  </select>
                  <input 
                    type="number" 
                    placeholder="Jumlah (Rp)" 
                    className="w-full p-2 border rounded"
                    id="amountInput"
                  />
                  <button 
                    onClick={() => {
                      const house = document.getElementById('houseSelect').value;
                      const week = document.getElementById('weekSelect').value;
                      const amount = Number(document.getElementById('amountInput').value);
                      if (house && week && amount) {
                        const key = `${house}-${selectedYear}-${selectedMonth}-${week}`;
                        setJimpitanData({...jimpitanData, [key]: amount});
                        document.getElementById('amountInput').value = '';
                      }
                    }}
                    className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {HOUSE_LIST.map(house => {
                const houseTotal = WEEKS.reduce((s, w) => 
                  s + (jimpitanData[`${house}-${selectedYear}-${selectedMonth}-${w}`] || 0), 0);
                return (
                  <div key={house} className="border rounded p-3 bg-white shadow">
                    <p className="font-bold text-emerald-600">{house}</p>
                    <p className="text-xs text-gray-500">Total Bulan Ini</p>
                    <p className="text-lg font-bold">{formatRp(houseTotal)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'pengeluaran' && (
          <div>
            <div className="bg-red-100 border border-red-500 p-4 rounded mb-4">
              <p className="text-red-800 font-bold">Total Pengeluaran {MONTHS[selectedMonth - 1]} {selectedYear}</p>
              <p className="text-2xl font-bold text-red-600">{formatRp(currentMonthExpense)}</p>
            </div>

            {isAdmin && (
              <div className="bg-orange-50 border border-orange-300 p-4 rounded mb-4">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Plus size={18} /> Tambah Pengeluaran</h3>
                <div className="space-y-2">
                  <input 
                    type="number" 
                    placeholder="Jumlah (Rp)" 
                    value={newExp.amount}
                    onChange={(e) => setNewExp({...newExp, amount: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <input 
                    type="text" 
                    placeholder="Deskripsi" 
                    value={newExp.desc}
                    onChange={(e) => setNewExp({...newExp, desc: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <input 
                    type="date" 
                    value={newExp.date}
                    onChange={(e) => setNewExp({...newExp, date: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <button 
                    onClick={handleAddExpense}
                    className="w-full bg-orange-600 text-white p-2 rounded font-bold hover:bg-orange-700"
                  >
                    Tambah
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {expenses
                .filter(e => e.month === selectedMonth && e.year === selectedYear)
                .map(exp => (
                  <div key={exp.id} className="border rounded p-3 bg-white shadow flex justify-between items-center">
                    <div>
                      <p className="font-bold">{exp.desc}</p>
                      <p className="text-xs text-gray-500">{exp.date}</p>
                    </div>
                    <p className="font-bold text-red-600">{formatRp(Number(exp.amount))}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">💾 Data disimpan otomatis di perangkat ini (localStorage)</p>
      </main>
    </div>
  );
}
