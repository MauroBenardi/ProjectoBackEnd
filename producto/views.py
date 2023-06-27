from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializer import CategoriaSerializer, SubcategoriaSerializer, SubsubcategoriaSerializer, TallaSerializer, ProductoSerializer, StockProductoSerializer

from .models import Categoria, Subcategoria, Subsubcategoria, Talla, Producto, StockProducto


class CategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriaSerializer
    queryset = Categoria.objects.all()

    @action(detail=False, methods=['GET'])
    def getCategoriaSubcategoria(self, request):
        categorias = self.get_queryset()
        serializer = self.get_serializer(categorias, many=True)
        data = []

        for index, categoria in enumerate(categorias):
            categoria_data = serializer.data[index]
            subcategorias = Subcategoria.objects.filter(categoria=categoria)
            subcategorias_data = []

            for subcategoria in subcategorias:
                subcategoria_data = SubcategoriaSerializer(subcategoria).data

                subsubcategorias = Subsubcategoria.objects.filter(subcategoria=subcategoria)
                subsubcategorias_data = SubsubcategoriaSerializer(subsubcategorias, many=True).data

                subcategoria_data['subsubcategorias'] = subsubcategorias_data
                subcategorias_data.append(subcategoria_data)

            categoria_data['subcategorias'] = subcategorias_data
            data.append(categoria_data)

        return Response(data)



class SubcategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = SubcategoriaSerializer
    queryset = Subcategoria.objects.all()


class SubsubcategoriaViewSet(viewsets.ModelViewSet):
    serializer_class = SubsubcategoriaSerializer
    queryset = Subsubcategoria.objects.all()


class TallaViewSet(viewsets.ModelViewSet):
    serializer_class = TallaSerializer
    queryset = Talla.objects.all()


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()

    @action(detail=False, methods=['GET'])
    def por_categoria(self, request):
        clasificacion = request.query_params.get('clasificacion')
        id = request.query_params.get('id')
        print(clasificacion, id, "##############################################################")

        if clasificacion == 'categoria':
            categoria = get_object_or_404(Categoria, id=id)
            productos = Producto.objects.filter(subsubcategoria__subcategoria__categoria=categoria)
        elif clasificacion == 'subcategoria':
            subcategoria = get_object_or_404(Subcategoria, id=id)
            productos = Producto.objects.filter(subsubcategoria__subcategoria=subcategoria)
        elif clasificacion == 'subsubcategoria':
            subsubcategoria = get_object_or_404(Subsubcategoria, id=id)
            productos = Producto.objects.filter(subsubcategoria=subsubcategoria)
        else:
            return Response({'error': 'Clasificación inválida'})

        data = []
        for producto in productos:
            tallas = []
            for stock in producto.stockproducto_set.all():
                tallas.append({
                    'id': stock.talla.id,  
                    'nombre': stock.talla.nombre
                })

            data.append({
                'id': producto.id,
                'nombre': producto.nombre,
                'precio': producto.precio,
                'subsubcategoria': producto.subsubcategoria.nombre,
                'tallas': tallas,
                'logo': producto.logo.url,
                'descripcion': producto.descripcion
            })
            print(data)
        return Response(data)




class StockProductoViewSet(viewsets.ModelViewSet):
    serializer_class = StockProductoSerializer
    queryset = StockProducto.objects.all()



