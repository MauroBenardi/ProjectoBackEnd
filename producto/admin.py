from django.contrib import admin
from django.db import models
from .models import Categoria, Subcategoria, Talla, Producto, StockProducto, Subsubcategoria

admin.site.register(Categoria)
admin.site.register(Subcategoria)
admin.site.register(Subsubcategoria)
admin.site.register(Talla)

class StockProductoInline(admin.TabularInline):
    model = StockProducto
    extra = 3

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    inlines = [StockProductoInline]
    list_display = ['nombre', 'precio', 'subsubcategoria', 'get_subcategoria', 'get_categoria']
    list_filter = ['subsubcategoria__subcategoria__categoria']
    search_fields = ['nombre', 'subsubcategoria__subcategoria__categoria__nombre', 'subsubcategoria__subcategoria__nombre', 'subsubcategoria__nombre']

    def get_subcategoria(self, obj):
        return obj.subsubcategoria.subcategoria.nombre

    get_subcategoria.short_description = 'Subcategoría'

    def get_categoria(self, obj):
        return obj.subsubcategoria.subcategoria.categoria.nombre

    get_categoria.short_description = 'Categoría'

@admin.register(StockProducto)
class StockProductoAdmin(admin.ModelAdmin):
    list_display = ['producto', 'talla', 'stock']
    list_filter = ['producto__subsubcategoria__subcategoria__categoria']
    search_fields = ['producto__nombre', 'talla__nombre']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        producto = obj.producto
        producto.stock = StockProducto.objects.filter(producto=producto).aggregate(total_stock=models.Sum('stock'))['total_stock']
        producto.save()



