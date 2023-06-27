from django.urls import path, include
from rest_framework.routers import DefaultRouter
from producto import views

# Crea un enrutador predeterminado para las vistas de la API
router = DefaultRouter()
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'subcategorias', views.SubcategoriaViewSet)
router.register(r'subsubcategoria',views.SubsubcategoriaViewSet)
router.register(r'tallas', views.TallaViewSet)
router.register(r'productos', views.ProductoViewSet, basename='producto')
router.register(r'stock', views.StockProductoViewSet)


urlpatterns = [
    
    # Agrega las rutas de la API generadas por el enrutador
    path('productos', include(router.urls)),
    path('productos/por_categoria/', views.ProductoViewSet.as_view({'get': 'por_categoria'}), name='producto-por-categoria'),

    path('productos/getCategoriaSubcategoria/', views.CategoriaViewSet.as_view({'get': 'getCategoriaSubcategoria'}), name='getCategoriaSubcategoria'),


]



