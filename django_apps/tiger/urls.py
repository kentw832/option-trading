from django.urls import include, path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

from tiger import views

router = routers.SimpleRouter()
router.register(r'tickers', views.TickerViewSet, basename='tickers')
router.register(r'blogs', views.BlogViewSet, basename='blogs')
router.register(r'brokers', views.BrokerViewSet, basename='brokers')

restful_urlpatterns = [
    path('api/', include(router.urls)),
    path('api/user', views.user_detail),
    path('api/user/set-brokers', views.set_brokers),
    path('api/tickers/<str:ticker_symbol>/contracts/', views.contracts, name='contracts'),
    path('api/tickers/<str:ticker_symbol>/trades/', views.get_best_trades, name='get_best_trades'),
    path('api/dev/tickers/<str:ticker_symbol>/trades/', views.get_top_trades, name='get_top_trades'),
    path('api/trade_snapshots/<int:pk>/', views.trade_snapshot_detail, name='trade_snapshot_detail'),
    path('api/trade_snapshots', views.trade_snapshots, name='trade_snapshots'),
    path('api/subscription/update', views.create_subscription),
    path('api/subscription/cancel', views.cancel_subscription),
    path('api/subscription/webhook/create', views.hook_create_subscription),
    path('api/subscription/webhook/activate', views.hook_activate_subscription),
    path('api/subscription/webhook/cancel', views.hook_cancel_subscription),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
restful_urlpatterns = format_suffix_patterns(restful_urlpatterns)

urlpatterns = [
                  # other urls.
              ] + restful_urlpatterns
