// src/app/dashboard/page.tsx
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Barra superior */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
            GT
          </div>
          <span className="font-bold text-lg tracking-wide">Gestor de Tienda</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Administrador</span>
          <Link
            href="/login"
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition"
          >
            Cerrar Sesión
          </Link>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
          <p className="text-gray-400 text-sm mt-1">
            Resumen general del inventario, ventas y operaciones del local.
          </p>
        </div>

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-sm space-y-2">
            <span className="text-sm font-medium text-gray-400">Productos en Inventario</span>
            <h2 className="text-3xl font-bold">128</h2>
            <span className="text-xs text-emerald-400 font-medium">+4 agregados recientemente</span>
          </div>

          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-sm space-y-2">
            <span className="text-sm font-medium text-gray-400">Ventas de Hoy</span>
            <h2 className="text-3xl font-bold">$1,240.00</h2>
            <span className="text-xs text-emerald-400 font-medium">+12% en comparación a ayer</span>
          </div>

          <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-sm space-y-2">
            <span className="text-sm font-medium text-gray-400">Alertas de Stock</span>
            <h2 className="text-3xl font-bold text-amber-400">3</h2>
            <span className="text-xs text-amber-400/80 font-medium">Productos con bajo inventario</span>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500 transition cursor-pointer space-y-1">
              <h3 className="font-medium text-white">Gestionar Inventario</h3>
              <p className="text-xs text-gray-400">Añadir, editar o revisar stock de productos.</p>
            </div>
            <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500 transition cursor-pointer space-y-1">
              <h3 className="font-medium text-white">Registrar Venta</h3>
              <p className="text-xs text-gray-400">Cobrar y generar ticket de salida rápido.</p>
            </div>
            <div className="p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl hover:border-blue-500 transition cursor-pointer space-y-1">
              <h3 className="font-medium text-white">Reportes</h3>
              <p className="text-xs text-gray-400">Visualizar ingresos y flujo de caja diario.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}