from django.db import models

# 1. PEHLE HUMNE CATEGORY KA MODEL BANAYA (Taki admin category dal sake)
class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Category Name")

    class Meta:
        verbose_name = "Service Category"
        verbose_name_plural = "Service Categories"

    def __str__(self):
        return self.name


# 2. AB APKA PURANA SERVICE MODEL (Bas isme humne Category ko link kar diya hai)
class Service(models.Model):
    # Ye line har service ko kisi category (jaise: Makeup, Hair) se jodegi
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services', null=True, blank=True, verbose_name="Select Category")
    title = models.CharField(max_length=200, verbose_name="Service Name")
    package_name = models.CharField(max_length=200, default="Full Body Package", verbose_name="Package Details")
    price = models.IntegerField(verbose_name="Price (₹)")
    image = models.ImageField(upload_to='services/', blank=True, null=True, help_text="Apni gallery/computer se image upload karein")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Studio Service"
        verbose_name_plural = "Studio Services"

    def __str__(self):
        return self.title


# 3. AAPKA PURANA CONTACT INFO MODEL (Bina kisi badlav ke)
class ContactInfo(models.Model):
    phone_number = models.CharField(max_length=15, default="+91 ")
    whatsapp_number = models.CharField(max_length=15, default="+91 ")
    email = models.EmailField(default="info@bhawnabeautystudio.com")
    address = models.TextField(default="Kanpur, Uttar Pradesh")
    google_map_link = models.URLField(max_length=500, blank=True, null=True, help_text="Google Maps ka embed/share link dalein")
    instagram_link = models.URLField(max_length=300, blank=True, null=True)

    class Meta:
        verbose_name = "Salon Contact Info"
        verbose_name_plural = "Salon Contact Info"

    def __str__(self):
        return "Bhawna Beauty Studio - Contact Settings"