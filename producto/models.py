from django.db import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class Subcategoria(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Subsubcategoria(models.Model):
    nombre = models.CharField(max_length=100)
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Talla(models.Model):
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100, blank=False)
    precio = models.FloatField(blank=False)
    subsubcategoria = models.ForeignKey(Subsubcategoria, on_delete=models.CASCADE, blank=False)
    tallas = models.ManyToManyField(Talla, through='StockProducto', blank=False)
    logo = models.ImageField(blank=True, null=True, upload_to='productos')
    descripcion = models.TextField(max_length=255)

    def __str__(self):
        return self.nombre


class StockProducto(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    talla = models.ForeignKey(Talla, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0, blank=False)

    def __str__(self):
        return f"{self.producto.nombre} - {self.talla.nombre} - Stock: {self.stock}"








