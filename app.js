const { useState, useEffect } = React;
const { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

// Iconos SVG
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    droplet: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8 10 4 14 4 18c0 4.4 3.6 8 8 8s8-3.6 8-8c0-4-4-8-8-16z" /></svg>,
    package: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    plus: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    trash: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    download: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
    upload: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
    save: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    x: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
    check: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
    alert: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    dollar: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    trending: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    fuel: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    cart: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  };
  return icons[name] || null;
};

function App() {
  const [activeTab, setActiveTab] = useState('clientes');
  const [clientes, setClientes] = useState([]);
  const [stock, setStock] = useState({ llenos12: 0, vacios12: 0, llenos20: 0, vacios20: 0 });
  const [precios, setPrecios] = useState({ 
    precioBidon12: 0, precioBidon20: 0, costoEnvase12: 0, costoEnvase20: 0,
    costoLlenado12: 0, costoLlenado20: 0, costoTapa: 0, costoDispenser: 0
  });
  const [finanzas, setFinanzas] = useState({ ingresos: [], gastosCombustible: [], gastosEnvases: [], gastosDispensers: [] });
  const [cobros, setCobros] = useState([]);
  const [nuevoGasto, setNuevoGasto] = useState({ tipo: 'combustible', monto: 0, descripcion: '', cantidad: 1 });
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '', direccion: '', telefono: '', dia: 'Lunes', 
    bidones12EnCasa: 0, bidones20EnCasa: 0, vacios12EnCliente: 0, vacios20EnCliente: 0
  });
  const [mostrarModalEntrega, setMostrarModalEntrega] = useState(false);
  const [mostrarModalRetiro, setMostrarModalRetiro] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [entregaTemp, setEntregaTemp] = useState({ cantidad12: 0, cantidad20: 0, pagado: false });
  const [retiroTemp, setRetiroTemp] = useState({ vacios12: 0, vacios20: 0 });
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mostrarBotonInstalar, setMostrarBotonInstalar] = useState(false);

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Cargar datos al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem('waterDeliveryData');
    if (datosGuardados) {
      try {
        const datos = JSON.parse(datosGuardados);
        setClientes(datos.clientes || []);
        setStock(datos.stock || { llenos12: 0, vacios12: 0, llenos20: 0, vacios20: 0 });
        setPrecios(datos.precios || { precioBidon12: 0, precioBidon20: 0, costoEnvase12: 0, costoEnvase20: 0, costoLlenado12: 0, costoLlenado20: 0, costoTapa: 0, costoDispenser: 0 });
        setFinanzas(datos.finanzas || { ingresos: [], gastosCombustible: [], gastosEnvases: [], gastosDispensers: [] });
        setCobros(datos.cobros || []);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }

    // Detectar evento de instalación PWA
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setMostrarBotonInstalar(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Guardar datos automáticamente
  useEffect(() => {
    const datos = { clientes, stock, precios, finanzas, cobros, fechaGuardado: new Date().toISOString() };
    localStorage.setItem('waterDeliveryData', JSON.stringify(datos));
  }, [clientes, stock, precios, finanzas, cobros]);

  const instalarApp = async () => {
    if (!deferredPrompt) {
      alert('📱 Para instalar:\n\nEn Chrome: Menú ⋮ → "Instalar aplicación"\nEn Safari: Compartir ⬆️ → "Agregar a pantalla de inicio"');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      alert('✅ ¡App instalada correctamente!');
    }
    setDeferredPrompt(null);
    setMostrarBotonInstalar(false);
  };

  const exportarDatos = () => {
    const datos = { clientes, stock, precios, finanzas, cobros, fechaExportacion: new Date().toISOString(), version: '1.0' };
    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `agua_datos_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    link.click();
    alert('✅ Datos exportados correctamente');
  };

  const importarDatos = (event) => {
    const archivo = event.target.files[0];
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = (e) => {
      try {
        const datosImportados = JSON.parse(e.target.result);
        if (datosImportados.clientes && datosImportados.stock) {
          const confirmar = window.confirm(`⚠️ Esto reemplazará todos tus datos.\n\nArchivo del: ${new Date(datosImportados.fechaExportacion || datosImportados.fechaGuardado).toLocaleString()}\nClientes: ${datosImportados.clientes.length}\n\n¿Continuar?`);
          if (confirmar) {
            setClientes(datosImportados.clientes || []);
            setStock(datosImportados.stock || { llenos12: 0, vacios12: 0, llenos20: 0, vacios20: 0 });
            setPrecios(datosImportados.precios || {});
            setFinanzas(datosImportados.finanzas || { ingresos: [], gastosCombustible: [], gastosEnvases: [], gastosDispensers: [] });
            setCobros(datosImportados.cobros || []);
            alert('✅ Datos importados correctamente');
          }
        } else {
          alert('❌ Archivo no válido');
        }
      } catch (error) {
        alert('❌ Error al leer el archivo');
      }
    };
    lector.readAsText(archivo);
    event.target.value = '';
  };

  const agregarCliente = () => {
    if (nuevoCliente.nombre && nuevoCliente.direccion) {
      setClientes([...clientes, { ...nuevoCliente, id: Date.now(), historial: [] }]);
      setNuevoCliente({ nombre: '', direccion: '', telefono: '', dia: 'Lunes', bidones12EnCasa: 0, bidones20EnCasa: 0, vacios12EnCliente: 0, vacios20EnCliente: 0 });
    }
  };

  const eliminarCliente = (id) => {
    if (window.confirm('¿Eliminar este cliente?')) {
      setClientes(clientes.filter(c => c.id !== id));
      setCobros(cobros.filter(c => c.clienteId !== id));
    }
  };

  const abrirModalEntrega = (cliente) => {
    setClienteSeleccionado(cliente);
    setEntregaTemp({ cantidad12: 0, cantidad20: 0, pagado: false });
    setMostrarModalEntrega(true);
  };

  const abrirModalRetiro = (cliente) => {
    setClienteSeleccionado(cliente);
    setRetiroTemp({ vacios12: 0, vacios20: 0 });
    setMostrarModalRetiro(true);
  };

  const registrarEntrega = (clienteId, cantidad12, cantidad20, pagado) => {
    if (cantidad12 === 0 && cantidad20 === 0) {
      alert('Debes entregar al menos un bidón');
      return;
    }
    if (stock.llenos12 < cantidad12) {
      alert(`No hay suficientes bidones de 12L. Disponibles: ${stock.llenos12}`);
      return;
    }
    if (stock.llenos20 < cantidad20) {
      alert(`No hay suficientes bidones de 20L. Disponibles: ${stock.llenos20}`);
      return;
    }

    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;

    const monto = (cantidad12 * precios.precioBidon12) + (cantidad20 * precios.precioBidon20);
    const costoProduccion = (cantidad12 * (precios.costoLlenado12 + precios.costoTapa)) + (cantidad20 * (precios.costoLlenado20 + precios.costoTapa));

    setClientes(clientes.map(c => {
      if (c.id === clienteId) {
        return {
          ...c,
          bidones12EnCasa: cantidad12,
          bidones20EnCasa: cantidad20,
          vacios12EnCliente: (c.vacios12EnCliente || 0) + (c.bidones12EnCasa || 0),
          vacios20EnCliente: (c.vacios20EnCliente || 0) + (c.bidones20EnCasa || 0),
        };
      }
      return c;
    }));

    setStock(s => ({
      llenos12: s.llenos12 - cantidad12,
      vacios12: s.vacios12 + (cliente.bidones12EnCasa || 0),
      llenos20: s.llenos20 - cantidad20,
      vacios20: s.vacios20 + (cliente.bidones20EnCasa || 0)
    }));

    if (costoProduccion > 0) {
      setFinanzas(prev => ({
        ...prev,
        gastosEnvases: [...prev.gastosEnvases, {
          fecha: new Date().toISOString(),
          monto: costoProduccion,
          descripcion: `Producción - ${cliente.nombre}`,
          tipo: 'Producción'
        }]
      }));
    }

    if (pagado) {
      setFinanzas(prev => ({
        ...prev,
        ingresos: [...prev.ingresos, {
          fecha: new Date().toISOString(),
          cliente: cliente.nombre,
          cantidad12, cantidad20, monto
        }]
      }));
    } else {
      setCobros(prev => [...prev, {
        id: Date.now(),
        clienteId, clienteNombre: cliente.nombre,
        fecha: new Date().toISOString(),
        cantidad12, cantidad20, monto, pagado: false
      }]);
    }

    alert(`✅ Entrega registrada\n${cliente.nombre}\n12L: ${cantidad12} | 20L: ${cantidad20}\nTotal: $${monto.toFixed(2)}`);
  };

  const confirmarEntrega = () => {
    if (!clienteSeleccionado) return;
    registrarEntrega(clienteSeleccionado.id, entregaTemp.cantidad12, entregaTemp.cantidad20, entregaTemp.pagado);
    setMostrarModalEntrega(false);
  };

  const confirmarRetiro = () => {
    if (!clienteSeleccionado) return;
    const cliente = clientes.find(c => c.id === clienteSeleccionado.id);
    if (!cliente) return;

    if (retiroTemp.vacios12 > (cliente.vacios12EnCliente || 0)) {
      alert(`El cliente solo tiene ${cliente.vacios12EnCliente || 0} bidones vacíos de 12L`);
      return;
    }
    if (retiroTemp.vacios20 > (cliente.vacios20EnCliente || 0)) {
      alert(`El cliente solo tiene ${cliente.vacios20EnCliente || 0} bidones vacíos de 20L`);
      return;
    }
    if (retiroTemp.vacios12 === 0 && retiroTemp.vacios20 === 0) {
      alert('Debes retirar al menos un bidón vacío');
      return;
    }

    setClientes(clientes.map(c => {
      if (c.id === clienteSeleccionado.id) {
        return {
          ...c,
          vacios12EnCliente: (c.vacios12EnCliente || 0) - retiroTemp.vacios12,
          vacios20EnCliente: (c.vacios20EnCliente || 0) - retiroTemp.vacios20
        };
      }
      return c;
    }));

    setStock(s => ({
      ...s,
      vacios12: s.vacios12 + retiroTemp.vacios12,
      vacios20: s.vacios20 + retiroTemp.vacios20
    }));

    alert(`✅ Retiro registrado\n${cliente.nombre}\nVacíos 12L: ${retiroTemp.vacios12}\nVacíos 20L: ${retiroTemp.vacios20}`);
    setMostrarModalRetiro(false);
  };

  const marcarComoPagado = (cobroId) => {
    const cobro = cobros.find(c => c.id === cobroId);
    if (cobro) {
      setFinanzas(prev => ({
        ...prev,
        ingresos: [...prev.ingresos, {
          fecha: new Date().toISOString(),
          cliente: cobro.clienteNombre,
          cantidad12: cobro.cantidad12,
          cantidad20: cobro.cantidad20,
          monto: cobro.monto
        }]
      }));
      setCobros(cobros.map(c => c.id === cobroId ? { ...c, pagado: true } : c));
    }
  };

  const agregarGasto = () => {
    if (nuevoGasto.monto <= 0) {
      alert('El monto debe ser mayor a 0');
      return;
    }

    const gasto = {
      fecha: new Date().toISOString(),
      monto: parseFloat(nuevoGasto.monto),
      descripcion: nuevoGasto.descripcion
    };

    setFinanzas(prev => {
      const nuevasFinanzas = { ...prev };
      
      switch(nuevoGasto.tipo) {
        case 'combustible':
          nuevasFinanzas.gastosCombustible = [...prev.gastosCombustible, gasto];
          break;
        case 'envases12':
          nuevasFinanzas.gastosEnvases = [...prev.gastosEnvases, { ...gasto, cantidad: parseInt(nuevoGasto.cantidad) || 1, tipo: '12 litros' }];
          setStock(s => ({ ...s, vacios12: s.vacios12 + (parseInt(nuevoGasto.cantidad) || 1) }));
          break;
        case 'envases20':
          nuevasFinanzas.gastosEnvases = [...prev.gastosEnvases, { ...gasto, cantidad: parseInt(nuevoGasto.cantidad) || 1, tipo: '20 litros' }];
          setStock(s => ({ ...s, vacios20: s.vacios20 + (parseInt(nuevoGasto.cantidad) || 1) }));
          break;
        case 'tapas':
          nuevasFinanzas.gastosEnvases = [...prev.gastosEnvases, { ...gasto, cantidad: parseInt(nuevoGasto.cantidad) || 1, tipo: 'Tapas' }];
          break;
        case 'dispensers':
          nuevasFinanzas.gastosDispensers = [...prev.gastosDispensers, { ...gasto, cantidad: parseInt(nuevoGasto.cantidad) || 1 }];
          break;
      }
      
      return nuevasFinanzas;
    });

    setNuevoGasto({ tipo: 'combustible', monto: 0, descripcion: '', cantidad: 1 });
  };

  const calcularTotales = () => {
    const totalIngresos = finanzas.ingresos.reduce((sum, i) => sum + i.monto, 0);
    const totalCombustible = finanzas.gastosCombustible.reduce((sum, g) => sum + g.monto, 0);
    const totalEnvases = finanzas.gastosEnvases.reduce((sum, g) => sum + g.monto, 0);
    const totalDispensers = finanzas.gastosDispensers.reduce((sum, g) => sum + g.monto, 0);
    const totalGastos = totalCombustible + totalEnvases + totalDispensers;
    const ganancia = totalIngresos - totalGastos;
    const cobrosPendientes = cobros.filter(c => !c.pagado).reduce((sum, c) => sum + c.monto, 0);
    const totalBidones12Vendidos = finanzas.ingresos.reduce((sum, i) => sum + (i.cantidad12 || 0), 0);
    const totalBidones20Vendidos = finanzas.ingresos.reduce((sum, i) => sum + (i.cantidad20 || 0), 0);

    return { totalIngresos, totalCombustible, totalEnvases, totalDispensers, totalGastos, ganancia, cobrosPendientes, totalBidones12Vendidos, totalBidones20Vendidos };
  };

  const clientesPorDia = (dia) => clientes.filter(c => c.dia === dia);
  const totales = calcularTotales();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      {mostrarBotonInstalar && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-lg shadow-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icon name="droplet" className="w-8 h-8" />
              <div>
                <p className="font-bold">¡Instala la aplicación!</p>
                <p className="text-sm opacity-90">Accede más rápido desde tu pantalla de inicio</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={instalarApp} className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 font-medium">
                Instalar
              </button>
              <button onClick={() => setMostrarBotonInstalar(false)} className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-400">
                <Icon name="x" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Icon name="droplet" className="w-10 h-10" />
                Gestor de Reparto de Agua
              </h1>
              <div className="flex gap-3 flex-wrap">
                <label className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 cursor-pointer font-medium">
                  <Icon name="upload" />
                  Importar
                  <input type="file" accept=".json" onChange={importarDatos} className="hidden" />
                </label>
                <button onClick={exportarDatos} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 font-medium">
                  <Icon name="save" />
                  Exportar
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600 mb-1">12L Llenos</p>
                <p className="text-2xl font-bold text-blue-600">{stock.llenos12}</p>
                <input type="number" value={stock.llenos12} onChange={(e) => setStock({...stock, llenos12: parseInt(e.target.value) || 0})} className="mt-1 w-full px-2 py-1 border rounded text-sm" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600 mb-1">12L Vacíos</p>
                <p className="text-2xl font-bold text-gray-600">{stock.vacios12}</p>
                <input type="number" value={stock.vacios12} onChange={(e) => setStock({...stock, vacios12: parseInt(e.target.value) || 0})} className="mt-1 w-full px-2 py-1 border rounded text-sm" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600 mb-1">20L Llenos</p>
                <p className="text-2xl font-bold text-cyan-600">{stock.llenos20}</p>
                <input type="number" value={stock.llenos20} onChange={(e) => setStock({...stock, llenos20: parseInt(e.target.value) || 0})} className="mt-1 w-full px-2 py-1 border rounded text-sm" />
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600 mb-1">20L Vacíos</p>
                <p className="text-2xl font-bold text-gray-600">{stock.vacios20}</p>
                <input type="number" value={stock.vacios20} onChange={(e) => setStock({...stock, vacios20: parseInt(e.target.value) || 0})} className="mt-1 w-full px-2 py-1 border rounded text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600">Ingresos</p>
                <p className="text-xl font-bold text-green-600">${totales.totalIngresos.toFixed(2)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600">Gastos</p>
                <p className="text-xl font-bold text-red-600">${totales.totalGastos.toFixed(2)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-xs text-gray-600">Ganancia</p>
                <p className={`text-xl font-bold ${totales.ganancia >= 0 ? 'text-green-600' : 'text-red-600'}`}>${totales.ganancia.toFixed(2)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow border-2 border-orange-300">
                <p className="text-xs text-gray-600">Por Cobrar</p>
                <p className="text-xl font-bold text-orange-600">${totales.cobrosPendientes.toFixed(2)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg shadow">
                <p className="text-xs text-gray-700 font-medium">Vendidos</p>
                <p className="text-sm">12L: <span className="font-bold text-blue-600">{totales.totalBidones12Vendidos}</span></p>
                <p className="text-sm">20L: <span className="font-bold text-cyan-600">{totales.totalBidones20Vendidos}</span></p>
              </div>
            </div>
          </div>

          <div className="flex border-b overflow-x-auto">
            {['clientes', 'rutas', 'cobros', 'finanzas', 'precios'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 px-4 font-medium whitespace-nowrap ${activeTab === tab ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'cobros' && cobros.filter(c => !c.pagado).length > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">{cobros.filter(c => !c.pagado).length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'clientes' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Agregar Cliente</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <input type="text" placeholder="Nombre" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})} className="px-3 py-2 border rounded-lg" />
                  <input type="text" placeholder="Dirección" value={nuevoCliente.direccion} onChange={(e) => setNuevoCliente({...nuevoCliente, direccion: e.target.value})} className="px-3 py-2 border rounded-lg" />
                  <input type="text" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={(e) => setNuevoCliente({...nuevoCliente, telefono: e.target.value})} className="px-3 py-2 border rounded-lg" />
                  <select value={nuevoCliente.dia} onChange={(e) => setNuevoCliente({...nuevoCliente, dia: e.target.value})} className="px-3 py-2 border rounded-lg">
                    {dias.map(d => <option key={d}>{d}</option>)}
                  </select>
                  <input type="number" placeholder="Bidones 12L" value={nuevoCliente.bidones12EnCasa} onChange={(e) => setNuevoCliente({...nuevoCliente, bidones12EnCasa: parseInt(e.target.value) || 0})} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Bidones 20L" value={nuevoCliente.bidones20EnCasa} onChange={(e) => setNuevoCliente({...nuevoCliente, bidones20EnCasa: parseInt(e.target.value) || 0})} className="px-3 py-2 border rounded-lg" />
                  <button onClick={agregarCliente} className="md:col-span-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Icon name="plus" />Agregar
                  </button>
                </div>
                <div className="space-y-3">
                  {clientes.map(c => (
                    <div key={c.id} className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{c.nombre}</h3>
                          <p className="text-sm text-gray-600">{c.direccion} - {c.telefono}</p>
                          <div className="mt-2 flex gap-2 flex-wrap">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{c.dia}</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">12L: {c.bidones12EnCasa}</span>
                            <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded text-xs">20L: {c.bidones20EnCasa}</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Vacíos 12L: {c.vacios12EnCliente || 0}</span>
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Vacíos 20L: {c.vacios20EnCliente || 0}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => abrirModalEntrega(c)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Entregar</button>
                          <button onClick={() => abrirModalRetiro(c)} className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">Retirar</button>
                          <button onClick={() => eliminarCliente(c.id)} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                            <Icon name="trash" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rutas' && (
              <div className="space-y-4">
                {dias.map(dia => {
                  const clientesDia = clientesPorDia(dia);
                  return (
                    <div key={dia} className="border rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 flex justify-between">
                        <h3 className="font-bold">{dia}</h3>
                        <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm">{clientesDia.length}</span>
                      </div>
                      <div className="p-4 bg-gray-50">
                        {clientesDia.length === 0 ? <p className="text-center text-gray-500">Sin clientes</p> : clientesDia.map((c, i) => (
                          <div key={c.id} className="bg-white p-3 rounded mb-2 flex justify-between items-center">
                            <div>
                              <p className="font-bold">{i+1}. {c.nombre}</p>
                              <p className="text-sm text-gray-600">{c.direccion}</p>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-purple-100 px-2 py-1 rounded">12L: {c.bidones12EnCasa}</span>
                                <span className="text-xs bg-cyan-100 px-2 py-1 rounded">20L: {c.bidones20EnCasa}</span>
                              </div>
                            </div>
                            <button onClick={() => abrirModalEntrega(c)} className="bg-blue-600 text-white px-4 py-2 rounded">Entregar</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'cobros' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Cobros Pendientes</h2>
                <div className="space-y-3">
                  {cobros.filter(c => !c.pagado).length === 0 ? (
                    <div className="bg-green-50 p-8 rounded text-center border-2 border-green-200">
                      <Icon name="check" className="w-16 h-16 text-green-600 mx-auto mb-3" />
                      <p className="text-xl font-bold text-green-800">¡Sin cobros pendientes!</p>
                    </div>
                  ) : cobros.filter(c => !c.pagado).map(cobro => (
                    <div key={cobro.id} className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{cobro.clienteNombre}</h3>
                          <p className="text-sm text-gray-600">{new Date(cobro.fecha).toLocaleDateString()}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-sm bg-purple-100 px-2 py-1 rounded">12L: {cobro.cantidad12}</span>
                            <span className="text-sm bg-cyan-100 px-2 py-1 rounded">20L: {cobro.cantidad20}</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600 mt-2">${cobro.monto.toFixed(2)}</p>
                        </div>
                        <button onClick={() => marcarComoPagado(cobro.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
                          <Icon name="check" />Pagado
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'finanzas' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Registrar Gasto</h2>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <select value={nuevoGasto.tipo} onChange={(e) => setNuevoGasto({...nuevoGasto, tipo: e.target.value})} className="px-3 py-2 border rounded-lg">
                      <option value="combustible">Combustible</option>
                      <option value="envases12">Envases 12L</option>
                      <option value="envases20">Envases 20L</option>
                      <option value="tapas">Tapas</option>
                      <option value="dispensers">Dispensers</option>
                    </select>
                    <input type="number" step="0.01" placeholder="Monto" value={nuevoGasto.monto} onChange={(e) => setNuevoGasto({...nuevoGasto, monto: parseFloat(e.target.value) || 0})} className="px-3 py-2 border rounded-lg" />
                    {nuevoGasto.tipo !== 'combustible' && (
                      <input type="number" placeholder="Cantidad" value={nuevoGasto.cantidad} onChange={(e) => setNuevoGasto({...nuevoGasto, cantidad: parseInt(e.target.value) || 1})} className="px-3 py-2 border rounded-lg" />
                    )}
                    <input type="text" placeholder="Descripción" value={nuevoGasto.descripcion} onChange={(e) => setNuevoGasto({...nuevoGasto, descripcion: e.target.value})} className="px-3 py-2 border rounded-lg" />
                    <button onClick={agregarGasto} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                      <Icon name="plus" />Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'precios' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Configuración de Precios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
                    <label className="block text-sm font-medium mb-2">💧 Precio Bidón 12L</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input type="number" step="0.01" value={precios.precioBidon12} onChange={(e) => setPrecios({...precios, precioBidon12: parseFloat(e.target.value) || 0})} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-cyan-50 p-4 rounded-lg border-2 border-cyan-200">
                    <label className="block text-sm font-medium mb-2">💧 Precio Bidón 20L</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input type="number" step="0.01" value={precios.precioBidon20} onChange={(e) => setPrecios({...precios, precioBidon20: parseFloat(e.target.value) || 0})} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                    <label className="block text-sm font-medium mb-2">💦 Costo Llenado 12L</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input type="number" step="0.01" value={precios.costoLlenado12} onChange={(e) => setPrecios({...precios, costoLlenado12: parseFloat(e.target.value) || 0})} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border-2 border-indigo-200">
                    <label className="block text-sm font-medium mb-2">💦 Costo Llenado 20L</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input type="number" step="0.01" value={precios.costoLlenado20} onChange={(e) => setPrecios({...precios, costoLlenado20: parseFloat(e.target.value) || 0})} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200">
                    <label className="block text-sm font-medium mb-2">🔵 Costo Tapa</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input type="number" step="0.01" value={precios.costoTapa} onChange={(e) => setPrecios({...precios, costoTapa: parseFloat(e.target.value) || 0})} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Entrega */}
        {mostrarModalEntrega && clienteSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Registrar Entrega</h2>
                <button onClick={() => setMostrarModalEntrega(false)} className="text-gray-500">
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-bold text-lg">{clienteSeleccionado.nombre}</p>
                <p className="text-sm text-gray-600">{clienteSeleccionado.direccion}</p>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Bidones 12L</label>
                  <input type="number" min="0" value={entregaTemp.cantidad12} onChange={(e) => setEntregaTemp({...entregaTemp, cantidad12: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 border-2 rounded-lg text-lg" />
                  <p className="text-xs text-gray-500 mt-1">Stock: {stock.llenos12}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bidones 20L</label>
                  <input type="number" min="0" value={entregaTemp.cantidad20} onChange={(e) => setEntregaTemp({...entregaTemp, cantidad20: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 border-2 rounded-lg text-lg" />
                  <p className="text-xs text-gray-500 mt-1">Stock: {stock.llenos20}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="text-2xl font-bold text-green-600">${((entregaTemp.cantidad12 * precios.precioBidon12) + (entregaTemp.cantidad20 * precios.precioBidon20)).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="pagado" checked={entregaTemp.pagado} onChange={(e) => setEntregaTemp({...entregaTemp, pagado: e.target.checked})} className="w-5 h-5" />
                  <label htmlFor="pagado" className="text-sm font-medium">¿Pagó en el momento?</label>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMostrarModalEntrega(false)} className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium">Cancelar</button>
                <button onClick={confirmarEntrega} className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg font-medium">Confirmar</button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Retiro */}
        {mostrarModalRetiro && clienteSeleccionado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Retirar Vacíos</h2>
                <button onClick={() => setMostrarModalRetiro(false)} className="text-gray-500">
                  <Icon name="x" className="w-6 h-6" />
                </button>
              </div>
              <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                <p className="font-bold text-lg">{clienteSeleccionado.nombre}</p>
                <p className="text-sm text-gray-600">{clienteSeleccionado.direccion}</p>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Vacíos 12L</label>
                  <input type="number" min="0" max={clienteSeleccionado.vacios12EnCliente || 0} value={retiroTemp.vacios12} onChange={(e) => setRetiroTemp({...retiroTemp, vacios12: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 border-2 rounded-lg text-lg" />
                  <p className="text-xs text-gray-500 mt-1">Disponibles: {clienteSeleccionado.vacios12EnCliente || 0}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Vacíos 20L</label>
                  <input type="number" min="0" max={clienteSeleccionado.vacios20EnCliente || 0} value={retiroTemp.vacios20} onChange={(e) => setRetiroTemp({...retiroTemp, vacios20: parseInt(e.target.value) || 0})} className="w-full px-4 py-3 border-2 rounded-lg text-lg" />
                  <p className="text-xs text-gray-500 mt-1">Disponibles: {clienteSeleccionado.vacios20EnCliente || 0}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setMostrarModalRetiro(false)} className="flex-1 bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium">Cancelar</button>
                <button onClick={confirmarRetiro} className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-medium">Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
