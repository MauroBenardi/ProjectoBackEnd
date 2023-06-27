from rest_framework import serializers
from .models import Subcategoria, Subsubcategoria, Categoria, Talla, Producto, StockProducto


class SubsubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsubcategoria
        fields = ['id', 'nombre']


class SubcategoriaSerializer(serializers.ModelSerializer):
    subsubcategorias = SubsubcategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Subcategoria
        fields = ['id', 'nombre', 'subsubcategorias']


class CategoriaSerializer(serializers.ModelSerializer):
    subcategorias = SubcategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'subcategorias']


class TallaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Talla
        fields = ['id', 'nombre']


class ProductoSerializer(serializers.ModelSerializer):
    subsubcategoria = SubsubcategoriaSerializer()

    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'precio', 'subsubcategoria', 'tallas', 'logo', 'descripcion']


class StockProductoSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    talla = TallaSerializer()

    class Meta:
        model = StockProducto
        fields = ['id', 'producto', 'talla', 'stock']
