﻿using System.Linq;
using NzbDrone.Core.Tv;

namespace NzbDrone.Core.ReferenceData
{
    public class DailySeriesService
    {
        private readonly IDailySeriesDataProxy _proxy;
        private readonly ISeriesService _seriesService;

        public DailySeriesService(IDailySeriesDataProxy proxy, ISeriesService seriesService)
        {
            _proxy = proxy;
            _seriesService = seriesService;
        }

        public virtual void UpdateDailySeries()
        {
            var dailySeries = _proxy.GetDailySeriesIds();

            foreach (var tvdbId in dailySeries)
            {
                var series = _seriesService.FindByTvdbId(tvdbId);

                if (series != null)
                {
                    _seriesService.SetSeriesType(series.Id, SeriesType.Daily);
                }
            }
        }
    }
}
